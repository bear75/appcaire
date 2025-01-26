# eCare API Integration for Scheduling

## Overview

This document outlines the integration between eCare's API endpoints and Timefold's field service routing model. It details the required data mapping and transformation process for schedule optimization.

## eCare API Endpoints

### 1. Core Schedule Data

```typescript
GET / api / BusinessIntelligence / GetTaskMetricsExtended;
```

**Parameters:**

- `from`: Date (Required) - Filter start date
- `to`: Date (Required) - Filter end date
- `groupId`: integer (Optional) - Specific group filter

**Response Structure:**

```typescript
{
  Date: string;
  GroupData: [{
    GroupId: number;
    LastUpdate: string;
    Data: [{
      ClientPersonalId: string;
      ResourcePersonalId: string;
      TaskSteps: [{
        Id: number;
        Name: string;
        PlannedTime: number;
        DoneTime: number;
        Order: number;
      }];
      TaskID: number;
      PlannedStart: string;
      PlannedEnd: string;
      PlannedMinutes: number;
      VisitType: string;
      VisitTypeFlatRateMinutes: number;
    }];
  }];
}
```

### 2. Client Data Endpoints

```typescript
GET / api / Clients / GetClientDetails;
GET / api / Clients / GetClientTimeWindows;
GET / api / Clients / GetClientRequirements;
```

These endpoints provide:

- Client location data
- Preferred visit times
- Service requirements
- Special needs or preferences

### 3. Resource (Employee) Data Endpoints

```typescript
GET / api / Resources / GetResourceDetails;
GET / api / Resources / GetResourceSchedule;
GET / api / Resources / GetResourceBreaks;
```

These endpoints provide:

- Employee skills and qualifications
- Vehicle assignments
- Work schedules
- Break patterns
- Service areas

### 4. Service Type Data

```typescript
GET / api / Services / GetServiceTypes;
GET / api / Services / GetServiceDurations;
```

These endpoints provide:

- Service categories
- Standard durations
- Required qualifications
- Service priorities

### 5. Vehicle Data Endpoints

```typescript
GET / api / Resources / GetVehicleDetails;
GET / api / Resources / GetVehicleAssignments;
GET / api / Resources / GetVehicleStatus;
```

These endpoints provide:

- Vehicle details (type, capacity, equipment)
- Current assignments and availability
- Real-time status updates
- Location tracking data
- Maintenance schedules

### Vehicle Data Structure

```typescript
type Vehicle = {
  id: string;
  registration: string;
  type: "VAN" | "CAR" | "SPECIALIZED";
  capacity: number;
  status: "AVAILABLE" | "IN_USE" | "MAINTENANCE";
  equipment: string[];
  location?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  currentAssignment?: {
    employeeId: string;
    startTime: string;
    endTime: string;
  };
  maintenance?: {
    lastService: string;
    nextService: string;
    status: string;
  };
};

type VehicleAssignment = {
  vehicleId: string;
  employeeId: string;
  date: string;
  shift: {
    start: string;
    end: string;
  };
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
};
```

### Vehicle Integration Flow

1. **Initial Vehicle Data Sync:**

```typescript
// 1. Fetch vehicle details
const vehicles = await fetchVehicleDetails();

// 2. Get current assignments
const assignments = await fetchVehicleAssignments(date);

// 3. Get real-time status
const status = await fetchVehicleStatus();

// 4. Transform for Timefold
const timefoldVehicles = transformToTimefoldVehicles(
  vehicles,
  assignments,
  status,
);
```

2. **Real-time Updates:**

```typescript
// Subscribe to vehicle status changes
websocket.on("vehicle_status_change", async (event) => {
  const { vehicleId, status, location } = event;
  await updateVehicleStatus(vehicleId, status, location);
  if (needsReoptimization(status)) {
    await triggerScheduleOptimization();
  }
});
```

3. **Vehicle Assignment Updates:**

```typescript
// Handle new vehicle assignments
async function handleVehicleAssignment(assignment: VehicleAssignment) {
  // 1. Update local state
  await updateVehicleAssignment(assignment);

  // 2. Sync with eCare
  await syncAssignmentToECare(assignment);

  // 3. Update schedule visualization
  await updateScheduleView(assignment);
}
```

## Timefold Data Structure Mapping

### 1. Request Structure

```typescript
type TimefoldRequest = {
  config: {
    run: {
      name: string;
      termination: {
        spentLimit: string; // Format: "PT{minutes}M"
        unimprovedSpentLimit: string; // Format: "PT{minutes}M"
      };
    };
    model: {
      overrides: {
        minimizeTravelTimeWeight: number;
        balanceTimeUtilizationWeight: number;
      };
    };
  };
  modelInput: {
    vehicles: Vehicle[];
    visits: Visit[];
    skills: string[];
    planningWindow: {
      startDate: string; // ISO 8601 format
      endDate: string; // ISO 8601 format
    };
  };
};
```

### 2. Vehicle/Employee Object

```typescript
type Vehicle = {
  id: string; // From: ResourcePersonalId
  vehicleType: string; // Default: "VAN" or from ResourceDetails
  shifts: [
    {
      id: string; // Format: "${employeeId}-SHIFT1"
      startLocation: [number, number]; // [latitude, longitude] from ResourceDetails
      endLocation: [number, number]; // [latitude, longitude] from ResourceDetails
      minStartTime: string; // ISO 8601 from ResourceSchedule
      maxEndTime: string; // ISO 8601 from ResourceSchedule
      maxTravelTimePerVisit: string; // Format: "PT30M"
      skills: [
        {
          name: string; // From: ResourceDetails.qualifications
          level: number; // Default: 1
          multiplier: number; // Default: 1
        },
      ];
    },
  ];
};
```

### 3. Visit Object

```typescript
type Visit = {
  id: string; // From: TaskID
  location: [number, number]; // [latitude, longitude] from ClientDetails
  timeWindows: [
    {
      minStartTime: string; // ISO 8601 from ClientTimeWindows
      maxEndTime: string; // ISO 8601 from ClientTimeWindows
    },
  ];
  serviceDuration: string; // Format: "PT{minutes}M" from PlannedMinutes
  requiredSkills: [
    {
      name: string; // From: ClientRequirements
      minLevel: number; // Default: 1
    },
  ];
  priority: string; // "1" to "10", mapped from VisitType priority
};
```

## Integration Flow

1. **Initial Data Collection:**

```typescript
// 1. Fetch base schedule data
const scheduleData = await fetchTaskMetrics(fromDate, toDate);

// 2. Collect client information
const clientIds = extractUniqueClientIds(scheduleData);
const clientDetails = await fetchClientDetails(clientIds);

// 3. Collect resource information
const resourceIds = extractUniqueResourceIds(scheduleData);
const resourceDetails = await fetchResourceDetails(resourceIds);
```

2. **Data Transformation:**

```typescript
// Transform to Timefold format
const timefoldRequest = {
  config: {
    run: {
      name: "eCare Schedule Optimization",
      termination: {
        spentLimit: "PT10M",
        unimprovedSpentLimit: "PT3M",
      },
    },
    model: {
      overrides: {
        minimizeTravelTimeWeight: 1,
        balanceTimeUtilizationWeight: 1,
      },
    },
  },
  modelInput: {
    vehicles: transformToVehicles(resourceDetails),
    visits: transformToVisits(scheduleData, clientDetails),
    skills: extractUniqueSkills(resourceDetails),
    planningWindow: {
      startDate: fromDate.toISOString(),
      endDate: toDate.toISOString(),
    },
  },
};
```

3. **Helper Functions:**

```typescript
function transformToVehicles(resourceDetails) {
  return resourceDetails.map((resource) => ({
    id: resource.ResourcePersonalId,
    vehicleType: "VAN",
    shifts: [
      {
        id: `${resource.ResourcePersonalId}-SHIFT1`,
        startLocation: [resource.Latitude, resource.Longitude],
        endLocation: [resource.Latitude, resource.Longitude],
        minStartTime: resource.ShiftStart,
        maxEndTime: resource.ShiftEnd,
        maxTravelTimePerVisit: "PT30M",
        skills: resource.Qualifications.map((qual) => ({
          name: qual.toLowerCase(),
          level: 1,
          multiplier: 1,
        })),
      },
    ],
  }));
}

function transformToVisits(scheduleData, clientDetails) {
  return scheduleData.map((task) => ({
    id: task.TaskID.toString(),
    location: [
      clientDetails[task.ClientPersonalId].Latitude,
      clientDetails[task.ClientPersonalId].Longitude,
    ],
    timeWindows: [
      {
        minStartTime: task.PlannedStart,
        maxEndTime: task.PlannedEnd,
      },
    ],
    serviceDuration: `PT${task.PlannedMinutes}M`,
    requiredSkills: task.RequiredSkills.map((skill) => ({
      name: skill.toLowerCase(),
      minLevel: 1,
    })),
    priority: mapVisitTypeToPriority(task.VisitType),
  }));
}

function mapVisitTypeToPriority(visitType) {
  // Map eCare visit types to priority strings "1" through "10"
  const priorityMap = {
    URGENT: "10",
    HIGH: "8",
    NORMAL: "5",
    LOW: "3",
  };
  return priorityMap[visitType] || "5";
}
```

3. **Optimization Request:**
   ```typescript
   // Send to Timefold for optimization
   const optimizationResult = await timefold.optimize(timefoldRequest);
   ```

## Error Handling

1. **API Errors:**

   - Handle rate limiting
   - Implement retry logic
   - Log detailed error information

2. **Data Validation:**

   - Validate required fields
   - Check data consistency
   - Verify coordinate data

3. **Transformation Errors:**
   - Handle missing data gracefully
   - Provide fallback values where appropriate
   - Log transformation issues

## Best Practices

1. **Performance:**

   - Cache frequently accessed data
   - Batch API requests where possible
   - Implement parallel processing for transformations

2. **Security:**

   - Secure API credentials
   - Validate all input data
   - Implement rate limiting

3. **Maintenance:**
   - Monitor API versions
   - Track deprecation notices
   - Maintain error logs

## Future Enhancements

1. **Real-time Updates:**

   - Implement webhooks for schedule changes
   - Add real-time optimization capabilities
   - Enable progressive schedule updates

2. **Advanced Features:**

   - Multi-day scheduling optimization
   - Break optimization
   - Travel time optimization

3. **Analytics:**
   - Schedule efficiency metrics
   - Resource utilization tracking
   - Optimization impact analysis

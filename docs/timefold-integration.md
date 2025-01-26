# Timefold.ai Integration

## Overview

This document outlines the integration plan for Timefold.ai's field service routing model into the Caire platform's scheduling system.

## Integration Components

### 1. API Client Setup

- Create a dedicated Timefold API client in `src/lib/timefold/`
- Implement authentication and request handling
- Set up environment variables for API keys and endpoints

### 2. Solver Configuration

- Define constraint rules based on home care requirements:
  - Travel time minimization
  - Staff skill matching
  - Time window adherence
  - Break scheduling
  - Client preferences
  - Care continuity

### 3. Data Models

```typescript
type Visit = {
  id: string;
  clientId: string;
  requiredSkills: string[];
  timeWindow: {
    start: string;
    end: string;
  };
  duration: number;
  location: {
    lat: number;
    lng: number;
  };
};

type Staff = {
  id: string;
  skills: string[];
  workingHours: {
    start: string;
    end: string;
  };
  breaks: {
    start: string;
    duration: number;
  }[];
};

type SolverConfig = {
  constraintProviderClass: string;
  termination: {
    spentLimit: string;
  };
  environmentMode: string;
};
```

### 4. Integration Points

1. **Schedule Creation**

   - Convert Caire data model to Timefold format
   - Submit optimization request
   - Handle solver status updates

2. **Real-time Updates**

   - Implement webhook handlers for solver events
   - Update UI with optimization progress
   - Handle solution updates

3. **Constraint Management**
   - Expose constraint weights in UI
   - Allow real-time constraint adjustments
   - Visualize impact of constraint changes

### 5. Error Handling

- Implement retry mechanisms
- Handle API rate limits
- Log solver failures
- Provide fallback scheduling options

### 6. Vehicle Routing Configuration

#### Vehicle Constraints

```typescript
type VehicleConstraint = {
  type: "HARD" | "SOFT";
  weight: number;
  name: string;
  description: string;
};

const vehicleConstraints: VehicleConstraint[] = [
  {
    type: "HARD",
    weight: 1,
    name: "vehicle_capacity",
    description: "Vehicle capacity must not be exceeded",
  },
  {
    type: "HARD",
    weight: 1,
    name: "vehicle_range",
    description: "Total route distance must not exceed vehicle range",
  },
  {
    type: "SOFT",
    weight: 2,
    name: "minimize_travel_time",
    description: "Minimize total travel time for all vehicles",
  },
  {
    type: "SOFT",
    weight: 1,
    name: "balance_vehicle_usage",
    description: "Balance workload across available vehicles",
  },
];
```

#### Route Optimization

```typescript
type RouteOptimizationConfig = {
  maxRouteDistance: number; // Maximum distance per vehicle per day
  maxVisitsPerRoute: number; // Maximum visits per vehicle per day
  vehicleStartLocations: {
    [vehicleId: string]: [number, number]; // [lat, long]
  };
  vehicleEndLocations: {
    [vehicleId: string]: [number, number]; // [lat, long]
  };
  breakTimeWindows: {
    [vehicleId: string]: Array<{
      startTime: string;
      endTime: string;
      duration: number;
    }>;
  };
};
```

#### Vehicle Assignment Logic

```typescript
interface VehicleAssignmentParams {
  vehicles: Vehicle[];
  visits: Visit[];
  constraints: VehicleConstraint[];
  optimizationConfig: RouteOptimizationConfig;
}

async function optimizeVehicleAssignments(params: VehicleAssignmentParams) {
  // 1. Build optimization request
  const request = buildOptimizationRequest(params);

  // 2. Call Timefold solver
  const solution = await timefold.solve(request);

  // 3. Process and validate solution
  const assignments = processVehicleAssignments(solution);

  // 4. Apply assignments to schedule
  await applyVehicleAssignments(assignments);

  return assignments;
}
```

#### Real-time Updates

```typescript
// Handle real-time vehicle status changes
function handleVehicleStatusChange(event: VehicleStatusEvent) {
  const { vehicleId, status, location } = event;

  // 1. Update vehicle status
  updateVehicleStatus(vehicleId, status);

  // 2. Check if reoptimization is needed
  if (requiresReoptimization(status)) {
    // 3. Trigger partial reoptimization
    optimizeAffectedRoutes(vehicleId);
  }
}

// Handle route deviations
function handleRouteDeviation(event: RouteDeviationEvent) {
  const { vehicleId, actualRoute, plannedRoute } = event;

  // 1. Calculate deviation impact
  const impact = calculateDeviationImpact(actualRoute, plannedRoute);

  // 2. Update affected visits
  updateAffectedVisits(impact.affectedVisits);

  // 3. Trigger reoptimization if needed
  if (impact.requiresReoptimization) {
    optimizeAffectedRoutes(vehicleId);
  }
}
```

## Implementation Phases

### Phase 1: Basic Integration

- [x] Set up API client
- [ ] Implement data model conversion
- [ ] Create basic solver configuration
- [ ] Test with sample dataset

### Phase 2: Enhanced Features

- [ ] Add real-time optimization
- [ ] Implement constraint management UI
- [ ] Add progress visualization
- [ ] Integrate with existing schedule views

### Phase 3: Production Readiness

- [ ] Add error handling
- [ ] Implement monitoring
- [ ] Add performance optimizations
- [ ] Complete documentation

## Testing Strategy

1. Unit tests for data conversion
2. Integration tests with Timefold API
3. Performance testing with large datasets
4. UI testing for constraint management
5. End-to-end scheduling workflow tests

## Monitoring

- Track solver performance metrics
- Monitor API usage and limits
- Log optimization statistics
- Track constraint satisfaction levels

## Security Considerations

- Secure API key storage
- Data encryption in transit
- Access control for constraint management
- Audit logging for schedule changes

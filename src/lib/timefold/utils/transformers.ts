import type { 
  Employee, 
  Location, 
  SchedulingProblem, 
  TimeWindow, 
  Vehicle, 
  Visit 
} from '../types';

/**
 * Transform raw schedule data to Timefold format
 */
export function transformToTimefoldProblem(data: any): SchedulingProblem {
  return {
    visits: transformVisits(data.visits),
    employees: transformEmployees(data.employees),
    vehicles: data.vehicles ? transformVehicles(data.vehicles) : undefined,
    constraints: data.constraints || [],
    timeWindow: transformTimeWindow(data.timeWindow),
  };
}

/**
 * Transform visit data
 */
function transformVisits(visits: any[]): Visit[] {
  return visits.map(visit => ({
    id: visit.id,
    clientId: visit.clientId,
    location: transformLocation(visit.location),
    duration: visit.duration,
    requiredSkills: visit.requiredSkills,
    timeWindows: visit.timeWindows.map(transformTimeWindow),
    priority: visit.priority,
  }));
}

/**
 * Transform employee data
 */
function transformEmployees(employees: any[]): Employee[] {
  return employees.map(employee => ({
    id: employee.id,
    skills: employee.skills,
    availability: employee.availability.map(transformTimeWindow),
    location: transformLocation(employee.location),
    transportMode: employee.transportMode || 'DRIVING',
    maxWorkingHours: employee.maxWorkingHours,
    preferredClients: employee.preferredClients,
  }));
}

/**
 * Transform vehicle data
 */
function transformVehicles(vehicles: any[]): Vehicle[] {
  return vehicles.map(vehicle => ({
    id: vehicle.id,
    capacity: vehicle.capacity,
    location: transformLocation(vehicle.location),
    availability: vehicle.availability.map(transformTimeWindow),
  }));
}

/**
 * Transform location data
 */
function transformLocation(location: any): Location {
  // Handle different location formats
  if (Array.isArray(location)) {
    return {
      latitude: location[0],
      longitude: location[1],
    };
  }

  return {
    latitude: location.latitude || location.lat,
    longitude: location.longitude || location.lng,
    address: location.address,
  };
}

/**
 * Transform time window data
 */
function transformTimeWindow(window: any): TimeWindow {
  return {
    start: window.startTime || window.start,
    end: window.endTime || window.end,
  };
} 
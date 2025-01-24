import { setHours, startOfDay } from 'date-fns';

// Helper function to create a date at specific hour
const timeAt = (hour: number) => setHours(startOfDay(new Date()), hour).toISOString();

export const timefoldTestData = {
  // Vehicle/Employee data
  vehicles: [
    // Day shift employees (7:00-16:00)
    {
      id: 'EMP001',
      name: 'Anna Andersson',
      skills: ['medical', 'cleaning', 'mobility'],
      shifts: [{
        startTime: timeAt(7),
        endTime: timeAt(16),
        breaks: [{
          startTime: timeAt(11),
          endTime: timeAt(11.5),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3293, longitude: 18.0686 },
      vehicleId: 'CAR001',
    },
    {
      id: 'EMP002',
      name: 'Erik Eriksson',
      skills: ['medical', 'heavy_lifting'],
      shifts: [{
        startTime: timeAt(7),
        endTime: timeAt(16),
        breaks: [{
          startTime: timeAt(11.5),
          endTime: timeAt(12),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3251, longitude: 18.0710 },
      vehicleId: 'CAR001',
    },
    {
      id: 'EMP003',
      name: 'Maria Nilsson',
      skills: ['medical', 'cleaning'],
      shifts: [{
        startTime: timeAt(7),
        endTime: timeAt(16),
        breaks: [{
          startTime: timeAt(12),
          endTime: timeAt(12.5),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3251, longitude: 18.0710 },
      vehicleId: 'CAR002',
    },
    {
      id: 'EMP004',
      name: 'Johan Larsson',
      skills: ['medical', 'mobility'],
      shifts: [{
        startTime: timeAt(7),
        endTime: timeAt(16),
        breaks: [{
          startTime: timeAt(12.5),
          endTime: timeAt(13),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3325, longitude: 18.0649 },
      vehicleId: 'CAR002',
    },
    {
      id: 'EMP005',
      name: 'Karin Svensson',
      skills: ['medical', 'cleaning', 'heavy_lifting'],
      shifts: [{
        startTime: timeAt(7),
        endTime: timeAt(16),
        breaks: [{
          startTime: timeAt(13),
          endTime: timeAt(13.5),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3325, longitude: 18.0649 },
      vehicleId: 'CAR003',
    },
    // Evening shift employees (16:00-22:00)
    {
      id: 'EMP006',
      name: 'Peter Bergström',
      skills: ['medical', 'mobility'],
      shifts: [{
        startTime: timeAt(16),
        endTime: timeAt(22),
        breaks: [{
          startTime: timeAt(18.5),
          endTime: timeAt(19),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3293, longitude: 18.0686 },
      vehicleId: 'CAR001',
    },
    {
      id: 'EMP007',
      name: 'Lisa Lindberg',
      skills: ['medical', 'cleaning'],
      shifts: [{
        startTime: timeAt(16),
        endTime: timeAt(22),
        breaks: [{
          startTime: timeAt(19),
          endTime: timeAt(19.5),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3251, longitude: 18.0710 },
      vehicleId: 'CAR001',
    },
    {
      id: 'EMP008',
      name: 'Anders Karlsson',
      skills: ['medical', 'heavy_lifting'],
      shifts: [{
        startTime: timeAt(16),
        endTime: timeAt(22),
        breaks: [{
          startTime: timeAt(19.5),
          endTime: timeAt(20),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3251, longitude: 18.0710 },
      vehicleId: 'CAR002',
    },
    {
      id: 'EMP009',
      name: 'Eva Björk',
      skills: ['medical', 'cleaning', 'mobility'],
      shifts: [{
        startTime: timeAt(16),
        endTime: timeAt(22),
        breaks: [{
          startTime: timeAt(20),
          endTime: timeAt(20.5),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3325, longitude: 18.0649 },
      vehicleId: 'CAR002',
    },
    {
      id: 'EMP010',
      name: 'Olof Wikström',
      skills: ['medical', 'cleaning', 'heavy_lifting'],
      shifts: [{
        startTime: timeAt(16),
        endTime: timeAt(22),
        breaks: [{
          startTime: timeAt(20.5),
          endTime: timeAt(21),
          location: { latitude: 59.3293, longitude: 18.0686 },
        }],
      }],
      homeLocation: { latitude: 59.3325, longitude: 18.0649 },
      vehicleId: 'CAR003',
    },
  ],

  // Vehicle data
  cars: [
    {
      id: 'CAR001',
      type: 'Electric',
      capacity: 4,
      range: 400, // km
    },
    {
      id: 'CAR002',
      type: 'Hybrid',
      capacity: 4,
      range: 800, // km
    },
    {
      id: 'CAR003',
      type: 'Electric',
      capacity: 4,
      range: 400, // km
    },
  ],

  // Visit/Client data
  visits: [
    {
      id: 'VISIT001',
      clientId: 'CLIENT001',
      location: { latitude: 59.3293, longitude: 18.0686 },
      timeWindows: [{
        startTime: timeAt(7),
        endTime: timeAt(9),
      }],
      serviceDuration: 30, // minutes
      requiredSkills: ['medical', 'mobility'],
      priority: 1,
      tags: ['morning_medicine', 'mobility_assistance'],
    },
    {
      id: 'VISIT002',
      clientId: 'CLIENT002',
      location: { latitude: 59.3251, longitude: 18.0710 },
      timeWindows: [{
        startTime: timeAt(8),
        endTime: timeAt(10),
      }],
      serviceDuration: 45,
      requiredSkills: ['medical', 'cleaning'],
      priority: 2,
      tags: ['morning_medicine', 'cleaning'],
    },
    {
      id: 'VISIT003',
      clientId: 'CLIENT003',
      location: { latitude: 59.3325, longitude: 18.0649 },
      timeWindows: [{
        startTime: timeAt(9),
        endTime: timeAt(11),
      }],
      serviceDuration: 60,
      requiredSkills: ['medical', 'heavy_lifting'],
      priority: 1,
      tags: ['morning_medicine', 'mobility_assistance'],
    },
    // ... More morning visits
    {
      id: 'VISIT004',
      clientId: 'CLIENT004',
      location: { latitude: 59.3293, longitude: 18.0686 },
      timeWindows: [{
        startTime: timeAt(10),
        endTime: timeAt(12),
      }],
      serviceDuration: 30,
      requiredSkills: ['medical'],
      priority: 2,
      tags: ['medicine_check'],
    },
    {
      id: 'VISIT005',
      clientId: 'CLIENT005',
      location: { latitude: 59.3251, longitude: 18.0710 },
      timeWindows: [{
        startTime: timeAt(11),
        endTime: timeAt(13),
      }],
      serviceDuration: 45,
      requiredSkills: ['medical', 'cleaning'],
      priority: 3,
      tags: ['cleaning', 'lunch_preparation'],
    },
    // Afternoon/Evening visits
    {
      id: 'VISIT006',
      clientId: 'CLIENT006',
      location: { latitude: 59.3325, longitude: 18.0649 },
      timeWindows: [{
        startTime: timeAt(15),
        endTime: timeAt(17),
      }],
      serviceDuration: 30,
      requiredSkills: ['medical'],
      priority: 1,
      tags: ['evening_medicine'],
    },
    {
      id: 'VISIT007',
      clientId: 'CLIENT007',
      location: { latitude: 59.3293, longitude: 18.0686 },
      timeWindows: [{
        startTime: timeAt(16),
        endTime: timeAt(18),
      }],
      serviceDuration: 45,
      requiredSkills: ['medical', 'mobility'],
      priority: 2,
      tags: ['evening_routine', 'mobility_assistance'],
    },
    {
      id: 'VISIT008',
      clientId: 'CLIENT008',
      location: { latitude: 59.3251, longitude: 18.0710 },
      timeWindows: [{
        startTime: timeAt(17),
        endTime: timeAt(19),
      }],
      serviceDuration: 30,
      requiredSkills: ['medical', 'cleaning'],
      priority: 3,
      tags: ['evening_medicine', 'light_cleaning'],
    },
    {
      id: 'VISIT009',
      clientId: 'CLIENT009',
      location: { latitude: 59.3325, longitude: 18.0649 },
      timeWindows: [{
        startTime: timeAt(18),
        endTime: timeAt(20),
      }],
      serviceDuration: 60,
      requiredSkills: ['medical', 'heavy_lifting'],
      priority: 1,
      tags: ['evening_routine', 'mobility_assistance'],
    },
    {
      id: 'VISIT010',
      clientId: 'CLIENT010',
      location: { latitude: 59.3293, longitude: 18.0686 },
      timeWindows: [{
        startTime: timeAt(19),
        endTime: timeAt(21),
      }],
      serviceDuration: 30,
      requiredSkills: ['medical'],
      priority: 2,
      tags: ['evening_medicine'],
    },
    {
      id: 'VISIT011',
      clientId: 'CLIENT011',
      location: { latitude: 59.3251, longitude: 18.0710 },
      timeWindows: [{
        startTime: timeAt(20),
        endTime: timeAt(22),
      }],
      serviceDuration: 45,
      requiredSkills: ['medical', 'mobility'],
      priority: 1,
      tags: ['evening_routine', 'mobility_assistance'],
    },
    {
      id: 'VISIT012',
      clientId: 'CLIENT012',
      location: { latitude: 59.3325, longitude: 18.0649 },
      timeWindows: [{
        startTime: timeAt(7),
        endTime: timeAt(9),
      }],
      serviceDuration: 30,
      requiredSkills: ['medical', 'cleaning'],
      priority: 2,
      tags: ['morning_medicine', 'cleaning'],
    },
    {
      id: 'VISIT013',
      clientId: 'CLIENT013',
      location: { latitude: 59.3293, longitude: 18.0686 },
      timeWindows: [{
        startTime: timeAt(8),
        endTime: timeAt(10),
      }],
      serviceDuration: 45,
      requiredSkills: ['medical'],
      priority: 3,
      tags: ['morning_medicine'],
    },
    {
      id: 'VISIT014',
      clientId: 'CLIENT014',
      location: { latitude: 59.3251, longitude: 18.0710 },
      timeWindows: [{
        startTime: timeAt(16),
        endTime: timeAt(18),
      }],
      serviceDuration: 30,
      requiredSkills: ['medical', 'mobility'],
      priority: 1,
      tags: ['evening_medicine', 'mobility_assistance'],
    },
    {
      id: 'VISIT015',
      clientId: 'CLIENT015',
      location: { latitude: 59.3325, longitude: 18.0649 },
      timeWindows: [{
        startTime: timeAt(17),
        endTime: timeAt(19),
      }],
      serviceDuration: 45,
      requiredSkills: ['medical', 'cleaning'],
      priority: 2,
      tags: ['evening_routine', 'cleaning'],
    },
  ],

  // Configuration for the optimization
  configuration: {
    timeWindowType: 'HARD', // Hard constraint for time windows
    skillRequirements: 'HARD', // Hard constraint for required skills
    vehicleCapacity: 'SOFT', // Soft constraint for vehicle capacity
    minimizeTransitTime: true,
    balanceLoad: true,
    considerTraffic: true,
    maxTransitTime: 30, // minutes
    defaultServiceTime: 30, // minutes
    region: 'Stockholm',
    timezone: 'Europe/Stockholm',
  },
};

export type TimefoldTestData = typeof timefoldTestData;

# Database Design Document for **Caire Platform MVP**

## 1. Introduction
The Caire platform requires a scalable, secure, and modular database schema to support its MVP and future phases. The database will handle data for multi-tenancy (multiple organizations), user roles, scheduling, analytics, and integrations with external systems like **Timefold.ai** and **Alfa eCare**.

### Key Design Goals
- **Multi-Tenancy**: Support multiple home care organizations with isolated data scopes.
- **Flexibility**: Easily accommodate trial users, integrations, and real-time updates.
- **Security**: Ensure compliance with GDPR by pseudonymizing sensitive data and encrypting patient addresses.
- **Efficiency**: Enable fast schedule generation, analytics, and role-based data access.
- **Constraint Management**: Support flexible definition and management of scheduling constraints.

---

## 2. Database Entities

### 2.1 **Core Tables**

#### **Organizations**
Stores details of home care companies.
```sql
CREATE TABLE Organizations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    trial_expiration_date DATE,
    status ENUM('trial', 'active', 'suspended') DEFAULT 'trial',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **Users**
Stores platform users with role-based access control (RBAC).
```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'scheduler', 'employee', 'client') NOT NULL,
    organization_id UUID REFERENCES Organizations(id),
    status ENUM('active', 'trial', 'suspended', 'deactivated') DEFAULT 'trial',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2.2 **Constraint Management**

#### **Constraint Definitions**
Defines the types and weights of constraints for scheduling.
```sql
CREATE TABLE ConstraintDefinitions (
    id UUID PRIMARY KEY,
    organization_id UUID REFERENCES Organizations(id),
    name VARCHAR(255) NOT NULL,
    type ENUM('HARD', 'MEDIUM', 'SOFT') NOT NULL,
    priority VARCHAR(255) NOT NULL,
    weight INTEGER NOT NULL,
    category ENUM('SKILL', 'PREFERENCE', 'RESOURCE', 'TIME', 'LOCATION') NOT NULL,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **Constraint Values**
Stores the actual constraint values for different entities.
```sql
CREATE TABLE ConstraintValues (
    id UUID PRIMARY KEY,
    constraint_definition_id UUID REFERENCES ConstraintDefinitions(id),
    entity_type ENUM('ORGANIZATION', 'EMPLOYEE', 'CLIENT') NOT NULL,
    entity_id UUID NOT NULL,
    value JSONB NOT NULL,
    override_weight INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2.3 **Resource Management**

#### **Vehicles**
Manages organization's vehicle fleet.
```sql
CREATE TABLE Vehicles (
    id UUID PRIMARY KEY,
    organization_id UUID REFERENCES Organizations(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    capacity INTEGER,
    status ENUM('ACTIVE', 'MAINTENANCE', 'INACTIVE') DEFAULT 'ACTIVE',
    location POINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **Shift Templates**
Defines standard shift patterns.
```sql
CREATE TABLE ShiftTemplates (
    id UUID PRIMARY KEY,
    organization_id UUID REFERENCES Organizations(id),
    name VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    break_windows JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **Employee Shifts**
Tracks actual employee shift assignments.
```sql
CREATE TABLE EmployeeShifts (
    id UUID PRIMARY KEY,
    employee_id UUID REFERENCES Employees(id),
    shift_template_id UUID REFERENCES ShiftTemplates(id),
    date DATE NOT NULL,
    vehicle_id UUID REFERENCES Vehicles(id),
    actual_start TIMESTAMP,
    actual_end TIMESTAMP,
    status ENUM('PLANNED', 'ACTIVE', 'COMPLETED') DEFAULT 'PLANNED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2.4 **Service Management**

#### **Visit Requirements**
Defines client service requirements and preferences.
```sql
CREATE TABLE VisitRequirements (
    id UUID PRIMARY KEY,
    client_id UUID REFERENCES Clients(id),
    service_type VARCHAR(255) NOT NULL,
    duration INTERVAL NOT NULL,
    frequency JSONB,
    priority INTEGER DEFAULT 1,
    time_windows JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2.5 **Scheduling and Analytics**

#### **Schedule Solutions**
Stores scheduling optimization results.
```sql
CREATE TABLE ScheduleSolutions (
    id UUID PRIMARY KEY,
    organization_id UUID REFERENCES Organizations(id),
    run_date TIMESTAMP NOT NULL,
    input_data JSONB NOT NULL,
    output_solution JSONB NOT NULL,
    score JSONB NOT NULL,
    status ENUM('RUNNING', 'COMPLETED', 'FAILED') DEFAULT 'RUNNING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### **Schedule Metrics**
Tracks KPIs and performance metrics.
```sql
CREATE TABLE ScheduleMetrics (
    id UUID PRIMARY KEY,
    organization_id UUID REFERENCES Organizations(id),
    schedule_date DATE NOT NULL,
    metric_type VARCHAR(255) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    constraint_impacts JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 3. Key Relationships

### 3.1 Constraint Management
- Organizations define their constraints
- Constraints can be overridden at employee/client level
- System constraints cannot be modified

### 3.2 Resource Planning
- Employees are assigned to shifts
- Shifts can have vehicle assignments
- Vehicle assignments consider employee qualifications

### 3.3 Service Delivery
- Client visits are planned based on requirements
- Visit requirements consider constraints
- Actual service delivery is tracked for analytics

---

## 4. Data Types and Formats

### 4.1 JSON Structures
- **Constraints**: `{ type, value, priority }`
- **Break Windows**: `[{ start, end, required }]`
- **Time Windows**: `[{ day, start, end, preference }]`
- **Schedule Solutions**: Complete solution including routes and assignments

### 4.2 Enums and Constants
- Constraint Types: HARD, MEDIUM, SOFT
- Entity Types: ORGANIZATION, EMPLOYEE, CLIENT
- Status Types: Various per entity

---

## 5. Security & Compliance

### 5.1 Data Protection
- Encrypt sensitive client data
- Use row-level security for multi-tenancy
- Audit logging for critical operations

### 5.2 Access Control
- Role-based access control
- Organization-level data isolation
- API key management for integrations

---

## 6. Performance Considerations

### 6.1 Indexing Strategy
- Index foreign keys
- Index frequently queried fields
- Consider partial indexes for large tables

### 6.2 Partitioning
- Consider partitioning by organization
- Time-based partitioning for historical data
- Archive old schedule solutions

### 6.3 Migration Management
- Migrations stored in `/migrations` directory
- Each migration file follows the format: `XXXX_name.sql`
- Migration metadata stored in `/migrations/meta`
- Drizzle ORM used for schema management and migrations
- Schema defined in `src/models/Schema.ts`

-- Enable RLS on all tables
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE constraint_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE constraint_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shift_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_shifts ENABLE ROW LEVEL SECURITY;

-- Organization policies
CREATE POLICY "Organization access for organization members" ON organization
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM users 
      WHERE organization_id = id
    )
  );

-- Users policies
CREATE POLICY "Users can view their own organization's users" ON users
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage their organization's users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = users.organization_id 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Employees policies
CREATE POLICY "View employees in same organization" ON employees
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage employees in same organization" ON employees
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = employees.organization_id 
      AND role IN ('super_admin', 'admin', 'scheduler')
    )
  );

-- Clients policies
CREATE POLICY "View clients in same organization" ON clients
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage clients in same organization" ON clients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = clients.organization_id 
      AND role IN ('super_admin', 'admin', 'scheduler')
    )
  );

-- Schedules policies
CREATE POLICY "View schedules in same organization" ON schedules
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage schedules in same organization" ON schedules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = schedules.organization_id 
      AND role IN ('super_admin', 'admin', 'scheduler')
    )
  );

-- Schedule assignments policies
CREATE POLICY "View schedule assignments in same organization" ON schedule_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM schedules s
      JOIN users u ON s.organization_id = u.organization_id
      WHERE s.id = schedule_id 
      AND u.user_id = auth.uid()
    )
  );

CREATE POLICY "Manage schedule assignments in same organization" ON schedule_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM schedules s
      JOIN users u ON s.organization_id = u.organization_id
      WHERE s.id = schedule_id 
      AND u.user_id = auth.uid()
      AND u.role IN ('super_admin', 'admin', 'scheduler')
    )
  );

-- Analytics policies
CREATE POLICY "View analytics in same organization" ON analytics
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

-- Constraint policies
CREATE POLICY "View constraints in same organization" ON constraint_definitions
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage constraints in same organization" ON constraint_definitions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = constraint_definitions.organization_id 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Vehicles policies
CREATE POLICY "View vehicles in same organization" ON vehicles
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage vehicles in same organization" ON vehicles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = vehicles.organization_id 
      AND role IN ('super_admin', 'admin', 'scheduler')
    )
  );

-- Shift templates policies
CREATE POLICY "View shift templates in same organization" ON shift_templates
  FOR SELECT USING (
    organization_id IN (
      SELECT organization_id FROM users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Manage shift templates in same organization" ON shift_templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE user_id = auth.uid() 
      AND organization_id = shift_templates.organization_id 
      AND role IN ('super_admin', 'admin', 'scheduler')
    )
  );

-- Employee shifts policies
CREATE POLICY "View employee shifts in same organization" ON employee_shifts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM employees e
      JOIN users u ON e.organization_id = u.organization_id
      WHERE e.id = employee_id 
      AND u.user_id = auth.uid()
    )
  );

CREATE POLICY "Manage employee shifts in same organization" ON employee_shifts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM employees e
      JOIN users u ON e.organization_id = u.organization_id
      WHERE e.id = employee_id 
      AND u.user_id = auth.uid()
      AND u.role IN ('super_admin', 'admin', 'scheduler')
    )
  ); 
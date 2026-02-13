-- Fix RLS policies to allow authenticated users (admin) full access

-- Courses: allow authenticated users full CRUD
CREATE POLICY "Allow authenticated full access courses" ON courses
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Documents: allow authenticated users full CRUD
CREATE POLICY "Allow authenticated full access documents" ON documents
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Page content: allow authenticated users full CRUD
CREATE POLICY "Allow authenticated full access page_content" ON page_content
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Site settings: allow authenticated users full CRUD
CREATE POLICY "Allow authenticated full access site_settings" ON site_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Contact submissions: allow authenticated users to read
CREATE POLICY "Allow authenticated read contact_submissions" ON contact_submissions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Course registrations: allow authenticated users to read
CREATE POLICY "Allow authenticated read course_registrations" ON course_registrations
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin users: allow authenticated users to read
CREATE POLICY "Allow authenticated read admin_users" ON admin_users
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Simplified admin user creation using DO block to handle existing user
-- Creating admin user with correct credentials
-- Email: alfa.taxischule@gmail.com
-- Password: Alper.181r1

DO $$
BEGIN
  -- Check if user already exists before inserting
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'alfa.taxischule@gmail.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      raw_app_meta_data,
      raw_user_meta_data
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'alfa.taxischule@gmail.com',
      crypt('Alper.181r1', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '',
      '{"provider":"email","providers":["email"]}',
      '{"name":"ALFA Admin"}'
    );
  END IF;
END $$;

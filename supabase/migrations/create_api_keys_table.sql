/*
  # API Keys Management System

  1. New Tables
    - `api_keys`
      - `id` (uuid, primary key) - Unique identifier for each API key
      - `key_hash` (text, unique, not null) - SHA-256 hash of the API key for secure storage
      - `key_prefix` (text, not null) - First 8 characters of the key for identification
      - `name` (text, not null) - Human-readable name/description for the key
      - `user_id` (uuid, nullable) - Optional user association for multi-user support
      - `is_active` (boolean, default true) - Whether the key is currently active
      - `rate_limit` (integer, default 1000) - Maximum requests per hour
      - `request_count` (integer, default 0) - Current hour request counter
      - `last_request_at` (timestamptz, nullable) - Timestamp of last API request
      - `rate_limit_reset_at` (timestamptz, not null) - When the rate limit counter resets
      - `expires_at` (timestamptz, nullable) - Optional expiration date for the key
      - `created_at` (timestamptz, default now()) - When the key was created
      - `updated_at` (timestamptz, default now()) - Last modification timestamp

    - `api_key_usage_logs`
      - `id` (uuid, primary key) - Unique log entry identifier
      - `api_key_id` (uuid, foreign key) - Reference to the API key used
      - `endpoint` (text, not null) - API endpoint accessed
      - `request_method` (text, not null) - HTTP method (GET, POST, etc.)
      - `status_code` (integer, not null) - Response status code
      - `ip_address` (text, nullable) - Client IP address
      - `user_agent` (text, nullable) - Client user agent
      - `created_at` (timestamptz, default now()) - Request timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own API keys
    - Add policies for service role to validate and log API usage
    - Use SHA-256 hashing for secure key storage

  3. Important Notes
    - API keys are hashed using SHA-256 before storage
    - Rate limiting is implemented per key with hourly reset
    - Usage logs are maintained for monitoring and auditing
    - Keys can be deactivated without deletion for security
    - Optional expiration dates for temporary access
*/

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_hash text UNIQUE NOT NULL,
  key_prefix text NOT NULL,
  name text NOT NULL,
  user_id uuid,
  is_active boolean DEFAULT true NOT NULL,
  rate_limit integer DEFAULT 1000 NOT NULL,
  request_count integer DEFAULT 0 NOT NULL,
  last_request_at timestamptz,
  rate_limit_reset_at timestamptz DEFAULT (now() + interval '1 hour') NOT NULL,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create api_key_usage_logs table
CREATE TABLE IF NOT EXISTS api_key_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id uuid REFERENCES api_keys(id) ON DELETE CASCADE NOT NULL,
  endpoint text NOT NULL,
  request_method text NOT NULL,
  status_code integer NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_api_key_usage_logs_api_key_id ON api_key_usage_logs(api_key_id);
CREATE INDEX IF NOT EXISTS idx_api_key_usage_logs_created_at ON api_key_usage_logs(created_at);

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_key_usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for api_keys table

-- Authenticated users can view their own API keys
CREATE POLICY "Users can view own API keys"
  ON api_keys FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can create their own API keys
CREATE POLICY "Users can create own API keys"
  ON api_keys FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update their own API keys
CREATE POLICY "Users can update own API keys"
  ON api_keys FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can delete their own API keys
CREATE POLICY "Users can delete own API keys"
  ON api_keys FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role can access all keys for validation
CREATE POLICY "Service role can access all API keys"
  ON api_keys FOR SELECT
  TO service_role
  USING (true);

-- Service role can update key usage statistics
CREATE POLICY "Service role can update API key usage"
  ON api_keys FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for api_key_usage_logs table

-- Authenticated users can view logs for their own API keys
CREATE POLICY "Users can view own API key logs"
  ON api_key_usage_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM api_keys
      WHERE api_keys.id = api_key_usage_logs.api_key_id
      AND api_keys.user_id = auth.uid()
    )
  );

-- Service role can insert usage logs
CREATE POLICY "Service role can insert usage logs"
  ON api_key_usage_logs FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Service role can view all logs
CREATE POLICY "Service role can view all logs"
  ON api_key_usage_logs FOR SELECT
  TO service_role
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_api_keys_updated_at ON api_keys;
CREATE TRIGGER update_api_keys_updated_at
  BEFORE UPDATE ON api_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

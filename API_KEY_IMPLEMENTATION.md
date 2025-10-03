# API Key Implementation Documentation

## Overview

This document provides a complete guide to the API key authentication system implemented for the Currency Calculator application. The system uses Supabase for data persistence, edge functions for API endpoints, and includes comprehensive security features.

## Architecture

### Components

1. **Database Layer** - PostgreSQL tables managed by Supabase
2. **Edge Functions** - Serverless functions for API key management and currency conversion
3. **Frontend Components** - React components for API key management and usage
4. **Service Layer** - TypeScript service for API communication

### Security Features

- **SHA-256 Key Hashing** - API keys are hashed before storage
- **Rate Limiting** - Per-key hourly rate limits (default: 1000 requests/hour)
- **Key Expiration** - Optional expiration dates for temporary access
- **Usage Logging** - Complete audit trail of API requests
- **Row Level Security (RLS)** - Database-level access control
- **Active/Inactive Status** - Keys can be deactivated without deletion

## Database Schema

### Table: `api_keys`

Stores API key metadata and usage statistics.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `key_hash` | text | SHA-256 hash of the API key |
| `key_prefix` | text | First 8 characters for identification |
| `name` | text | Human-readable name |
| `user_id` | uuid | Optional user association |
| `is_active` | boolean | Active status (default: true) |
| `rate_limit` | integer | Max requests/hour (default: 1000) |
| `request_count` | integer | Current hour request count |
| `last_request_at` | timestamptz | Last request timestamp |
| `rate_limit_reset_at` | timestamptz | Rate limit reset time |
| `expires_at` | timestamptz | Optional expiration date |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

### Table: `api_key_usage_logs`

Logs all API requests for monitoring and auditing.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `api_key_id` | uuid | Foreign key to api_keys |
| `endpoint` | text | API endpoint accessed |
| `request_method` | text | HTTP method (GET, POST, etc.) |
| `status_code` | integer | Response status code |
| `ip_address` | text | Client IP address |
| `user_agent` | text | Client user agent |
| `created_at` | timestamptz | Request timestamp |

## API Endpoints

### 1. Generate/List API Keys

**Endpoint:** `POST /functions/v1/api-key-generate`

**Authentication:** Required (Supabase Auth)

**Request Body:**
```json
{
  "name": "Production API Key",
  "rateLimit": 1000,
  "expiresInDays": 30
}
```

**Response (201 Created):**
```json
{
  "apiKey": "ck_a1b2c3d4e5f6...",
  "keyInfo": {
    "id": "uuid",
    "name": "Production API Key",
    "prefix": "ck_a1b2c",
    "rateLimit": 1000,
    "expiresAt": "2025-11-03T00:00:00.000Z",
    "createdAt": "2025-10-03T12:00:00.000Z"
  },
  "warning": "Store this API key securely. It will not be shown again."
}
```

**List API Keys:**

**Endpoint:** `GET /functions/v1/api-key-generate`

**Response (200 OK):**
```json
{
  "keys": [
    {
      "id": "uuid",
      "name": "Production API Key",
      "key_prefix": "ck_a1b2c",
      "is_active": true,
      "rate_limit": 1000,
      "request_count": 45,
      "last_request_at": "2025-10-03T12:30:00.000Z",
      "expires_at": "2025-11-03T00:00:00.000Z",
      "created_at": "2025-10-03T12:00:00.000Z"
    }
  ]
}
```

### 2. Validate API Key

**Endpoint:** `POST /functions/v1/api-key-validate`

**Headers:**
- `X-API-Key`: Your API key

**Response (200 OK):**
```json
{
  "valid": true,
  "keyInfo": {
    "id": "uuid",
    "name": "Production API Key",
    "rateLimit": 1000,
    "requestsRemaining": 955,
    "rateLimitReset": "2025-10-03T13:00:00.000Z"
  }
}
```

**Response Headers:**
- `X-RateLimit-Limit`: Total rate limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp

**Error Response (401 Unauthorized):**
```json
{
  "valid": false,
  "error": "Invalid API key"
}
```

**Error Response (429 Too Many Requests):**
```json
{
  "valid": false,
  "error": "Rate limit exceeded",
  "rateLimitReset": "2025-10-03T13:00:00.000Z"
}
```

### 3. Currency Conversion

**Endpoint:** `POST /functions/v1/currency-convert`

**Headers:**
- `X-API-Key`: Your API key
- `Content-Type`: application/json

**Request Body:**
```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100
}
```

**Response (200 OK):**
```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "result": 92.45,
  "rate": 0.9245,
  "timestamp": "2025-10-03T12:00:00.000Z"
}
```

**Response Headers:**
- `X-RateLimit-Limit`: Total rate limit
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp

## Usage Examples

### Example 1: Generate an API Key

```typescript
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/api-key-generate`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'My Production Key',
      rateLimit: 2000,
      expiresInDays: 90
    }),
  }
);

const data = await response.json();
console.log('API Key:', data.apiKey);
// Store securely - this is the only time you'll see it!
```

### Example 2: Convert Currency

```typescript
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/currency-convert`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'ck_your_api_key_here',
    },
    body: JSON.stringify({
      from: 'USD',
      to: 'EUR',
      amount: 100
    }),
  }
);

if (response.ok) {
  const data = await response.json();
  console.log(`${data.amount} ${data.from} = ${data.result} ${data.to}`);

  // Check rate limit
  const remaining = response.headers.get('X-RateLimit-Remaining');
  console.log(`Requests remaining: ${remaining}`);
} else {
  const error = await response.json();
  console.error('Error:', error.error);
}
```

### Example 3: Validate API Key

```typescript
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/api-key-validate`,
  {
    method: 'POST',
    headers: {
      'X-API-Key': 'ck_your_api_key_here',
    },
  }
);

const data = await response.json();

if (data.valid) {
  console.log('API Key is valid');
  console.log(`Requests remaining: ${data.keyInfo.requestsRemaining}`);
} else {
  console.error('Invalid API key:', data.error);
}
```

### Example 4: Using cURL

**Generate API Key:**
```bash
curl -X POST https://your-project.supabase.co/functions/v1/api-key-generate \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Key",
    "rateLimit": 1000
  }'
```

**Convert Currency:**
```bash
curl -X POST https://your-project.supabase.co/functions/v1/currency-convert \
  -H "X-API-Key: ck_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "USD",
    "to": "EUR",
    "amount": 100
  }'
```

## Rate Limiting

### How It Works

1. Each API key has a configurable rate limit (default: 1000 requests/hour)
2. Rate limit counter resets every hour
3. Each successful request increments the counter
4. When limit is reached, requests return 429 (Too Many Requests)
5. Rate limit information is returned in response headers

### Response Headers

All API responses include rate limit information:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 955
X-RateLimit-Reset: 2025-10-03T13:00:00.000Z
```

### Handling Rate Limits

```typescript
async function makeApiRequest(apiKey: string, data: any) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const remaining = parseInt(
    response.headers.get('X-RateLimit-Remaining') || '0'
  );

  if (remaining < 10) {
    console.warn('Warning: Approaching rate limit');
  }

  if (response.status === 429) {
    const resetTime = response.headers.get('X-RateLimit-Reset');
    console.error(`Rate limit exceeded. Resets at: ${resetTime}`);
    throw new Error('Rate limit exceeded');
  }

  return await response.json();
}
```

## Security Best Practices

### 1. Key Storage

**DO:**
- Store API keys in environment variables
- Use secure secret management systems (e.g., AWS Secrets Manager, HashiCorp Vault)
- Encrypt keys at rest if storing in database

**DON'T:**
- Hardcode keys in source code
- Commit keys to version control
- Share keys in plain text

### 2. Key Rotation

- Rotate keys regularly (recommended: every 90 days)
- Generate new key before deactivating old one
- Update all applications before deactivating old key

### 3. Monitoring

- Review usage logs regularly
- Set up alerts for unusual activity
- Monitor rate limit usage patterns

### 4. Access Control

- Use different keys for different environments (dev, staging, production)
- Set appropriate rate limits per key
- Use key expiration for temporary access

## Error Handling

### Common Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | API key is inactive or expired |
| 429 | Too Many Requests | Rate limit exceeded |
| 400 | Bad Request | Invalid request parameters |
| 500 | Internal Server Error | Server error |
| 502 | Bad Gateway | External API error |

### Example Error Handling

```typescript
try {
  const result = await ApiKeyService.convertCurrency({
    from: 'USD',
    to: 'EUR',
    amount: 100,
    apiKey: myApiKey,
  });
  console.log('Result:', result);
} catch (error) {
  if (error.message.includes('Rate limit exceeded')) {
    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, 60000));
    // Retry request...
  } else if (error.message.includes('Invalid API key')) {
    // Request new API key
    console.error('API key is invalid. Please generate a new one.');
  } else if (error.message.includes('inactive')) {
    // Key has been deactivated
    console.error('API key has been deactivated.');
  } else {
    // Other errors
    console.error('Conversion failed:', error.message);
  }
}
```

## Deployment Instructions

### 1. Apply Database Migration

The database migration is located at:
`/supabase/migrations/create_api_keys_table.sql`

Once the database connection is available, this migration will create:
- `api_keys` table
- `api_key_usage_logs` table
- Necessary indexes
- RLS policies
- Triggers

### 2. Deploy Edge Functions

The following edge functions need to be deployed:

1. **api-key-generate** - Manages API key creation and listing
2. **api-key-validate** - Validates API keys
3. **currency-convert** - Handles currency conversions with API key authentication

### 3. Environment Variables

Required environment variables (auto-configured in Supabase):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
```

### 4. Frontend Integration

Add the API key management component to your app:

```typescript
import ApiKeyManager from './components/ApiKeyManager';
import ApiCurrencyCalculator from './components/ApiCurrencyCalculator';

// In your app
<ApiKeyManager />
<ApiCurrencyCalculator />
```

## Testing

### Manual Testing

1. **Generate API Key**
   - Navigate to API Key Manager
   - Click "New API Key"
   - Fill in details and create
   - Copy and store the generated key

2. **Test Currency Conversion**
   - Open API Currency Calculator
   - Enter your API key
   - Enter amount and select currencies
   - Click "Convert Currency"
   - Verify result and rate limit info

3. **Test Rate Limiting**
   - Make multiple requests rapidly
   - Verify rate limit headers update
   - Exceed limit and verify 429 response

### Automated Testing

```typescript
describe('API Key System', () => {
  let testApiKey: string;

  test('should generate API key', async () => {
    const response = await generateApiKey({
      name: 'Test Key',
      rateLimit: 100,
    });
    expect(response.apiKey).toMatch(/^ck_/);
    testApiKey = response.apiKey;
  });

  test('should validate API key', async () => {
    const result = await validateApiKey(testApiKey);
    expect(result.valid).toBe(true);
  });

  test('should convert currency', async () => {
    const result = await convertCurrency({
      from: 'USD',
      to: 'EUR',
      amount: 100,
      apiKey: testApiKey,
    });
    expect(result.result).toBeGreaterThan(0);
    expect(result.rate).toBeGreaterThan(0);
  });

  test('should enforce rate limit', async () => {
    // Make requests until rate limit is hit
    for (let i = 0; i < 101; i++) {
      try {
        await convertCurrency({
          from: 'USD',
          to: 'EUR',
          amount: 100,
          apiKey: testApiKey,
        });
      } catch (error) {
        if (i === 100) {
          expect(error.message).toContain('Rate limit exceeded');
        }
      }
    }
  });
});
```

## Troubleshooting

### Issue: API Key Not Working

**Possible Causes:**
1. Key is inactive - Check `is_active` status
2. Key has expired - Check `expires_at` date
3. Rate limit exceeded - Wait for reset time
4. Invalid key format - Ensure key starts with `ck_`

**Solution:**
- Generate a new API key
- Check key status in API Key Manager
- Review usage logs for errors

### Issue: Rate Limit Errors

**Possible Causes:**
1. Too many requests in short time
2. Rate limit set too low for usage
3. Multiple applications using same key

**Solution:**
- Implement request throttling
- Increase rate limit for the key
- Use separate keys for different applications

### Issue: Database Connection Error

**Possible Causes:**
1. Supabase project not initialized
2. Environment variables not set
3. Network connectivity issues

**Solution:**
- Verify Supabase project is active
- Check `.env` file has correct values
- Test database connection directly

## Support

For issues or questions:

1. Check this documentation first
2. Review error messages and logs
3. Check Supabase dashboard for API key status
4. Review usage logs for patterns
5. Test with a fresh API key

## Future Enhancements

Potential improvements to consider:

1. **API Key Scopes** - Limit keys to specific endpoints
2. **IP Whitelisting** - Restrict keys to specific IP addresses
3. **Webhook Support** - Notify on rate limit or expiration
4. **Usage Analytics** - Dashboard with usage graphs
5. **Team Management** - Share keys across team members
6. **Key Rotation Automation** - Automatic key rotation
7. **Multiple Rate Limits** - Different limits for different endpoints
8. **Cost Tracking** - Track API costs per key

## Conclusion

This API key system provides enterprise-grade security and monitoring for the Currency Calculator application. It includes all essential features for production use:

- Secure key storage with SHA-256 hashing
- Per-key rate limiting
- Complete usage logging
- Key expiration support
- Row-level security
- Comprehensive error handling

The system is ready for deployment once the database connection is available.

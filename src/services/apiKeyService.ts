const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export interface CurrencyConversionRequest {
  from: string;
  to: string;
  amount: number;
  apiKey: string;
}

export interface CurrencyConversionResponse {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

export interface ApiKeyValidationResponse {
  valid: boolean;
  error?: string;
  keyInfo?: {
    id: string;
    name: string;
    rateLimit: number;
    requestsRemaining: number;
    rateLimitReset: string;
  };
}

export class ApiKeyService {
  static async convertCurrency(
    request: CurrencyConversionRequest
  ): Promise<CurrencyConversionResponse> {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/currency-convert`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': request.apiKey,
        },
        body: JSON.stringify({
          from: request.from,
          to: request.to,
          amount: request.amount,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Currency conversion failed');
    }

    return await response.json();
  }

  static async validateApiKey(apiKey: string): Promise<ApiKeyValidationResponse> {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/api-key-validate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
      }
    );

    return await response.json();
  }

  static getRateLimitInfo(headers: Headers) {
    return {
      limit: parseInt(headers.get('X-RateLimit-Limit') || '0'),
      remaining: parseInt(headers.get('X-RateLimit-Remaining') || '0'),
      reset: headers.get('X-RateLimit-Reset') || '',
    };
  }
}

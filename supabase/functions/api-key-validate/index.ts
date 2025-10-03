import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-API-Key",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const apiKey = req.headers.get("X-API-Key");

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Missing API key in X-API-Key header"
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const keyHash = await hashKey(apiKey);

    const { data: keyData, error: keyError } = await supabase
      .from("api_keys")
      .select("*")
      .eq("key_hash", keyHash)
      .maybeSingle();

    if (keyError) {
      console.error("Error validating API key:", keyError);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Error validating API key"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!keyData) {
      await logUsage(supabase, null, req, 401);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Invalid API key"
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!keyData.is_active) {
      await logUsage(supabase, keyData.id, req, 403);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "API key is inactive"
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
      await logUsage(supabase, keyData.id, req, 403);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "API key has expired"
        }),
        {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const now = new Date();
    const resetTime = new Date(keyData.rate_limit_reset_at);

    let requestCount = keyData.request_count;
    let rateLimitResetAt = keyData.rate_limit_reset_at;

    if (now > resetTime) {
      requestCount = 0;
      rateLimitResetAt = new Date(now.getTime() + 60 * 60 * 1000);
    }

    if (requestCount >= keyData.rate_limit) {
      await logUsage(supabase, keyData.id, req, 429);
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Rate limit exceeded",
          rateLimitReset: rateLimitResetAt
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "X-RateLimit-Limit": keyData.rate_limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResetAt.toISOString()
          },
        }
      );
    }

    const { error: updateError } = await supabase
      .from("api_keys")
      .update({
        request_count: requestCount + 1,
        last_request_at: now.toISOString(),
        rate_limit_reset_at: rateLimitResetAt.toISOString(),
      })
      .eq("id", keyData.id);

    if (updateError) {
      console.error("Error updating API key usage:", updateError);
    }

    await logUsage(supabase, keyData.id, req, 200);

    return new Response(
      JSON.stringify({
        valid: true,
        keyInfo: {
          id: keyData.id,
          name: keyData.name,
          rateLimit: keyData.rate_limit,
          requestsRemaining: keyData.rate_limit - requestCount - 1,
          rateLimitReset: rateLimitResetAt,
        }
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-RateLimit-Limit": keyData.rate_limit.toString(),
          "X-RateLimit-Remaining": (keyData.rate_limit - requestCount - 1).toString(),
          "X-RateLimit-Reset": rateLimitResetAt.toISOString()
        },
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        valid: false,
        error: "Internal server error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function logUsage(
  supabase: any,
  apiKeyId: string | null,
  req: Request,
  statusCode: number
): Promise<void> {
  if (!apiKeyId) return;

  try {
    const url = new URL(req.url);
    await supabase.from("api_key_usage_logs").insert({
      api_key_id: apiKeyId,
      endpoint: url.pathname,
      request_method: req.method,
      status_code: statusCode,
      ip_address: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip"),
      user_agent: req.headers.get("user-agent"),
    });
  } catch (error) {
    console.error("Error logging API usage:", error);
  }
}

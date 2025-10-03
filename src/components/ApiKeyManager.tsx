import { useState, useEffect } from 'react';
import { Key, Copy, Trash2, Plus, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  rate_limit: number;
  request_count: number;
  last_request_at: string | null;
  expires_at: string | null;
  created_at: string;
}

interface NewApiKeyResponse {
  apiKey: string;
  keyInfo: {
    id: string;
    name: string;
    prefix: string;
    rateLimit: number;
    expiresAt: string | null;
    createdAt: string;
  };
  warning: string;
}

export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyRateLimit, setNewKeyRateLimit] = useState(1000);
  const [newKeyExpireDays, setNewKeyExpireDays] = useState<number | ''>('');
  const [generatedKey, setGeneratedKey] = useState<NewApiKeyResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/api-key-generate`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch API keys');
      }

      const data = await response.json();
      setApiKeys(data.keys || []);
    } catch (err) {
      setError('Failed to load API keys. Please try again.');
      console.error('Error fetching API keys:', err);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      setError('Please enter a name for the API key');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `${supabaseUrl}/functions/v1/api-key-generate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newKeyName,
            rateLimit: newKeyRateLimit,
            expiresInDays: newKeyExpireDays || undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create API key');
      }

      const data: NewApiKeyResponse = await response.json();
      setGeneratedKey(data);
      setNewKeyName('');
      setNewKeyRateLimit(1000);
      setNewKeyExpireDays('');
      setShowCreateForm(false);
      await fetchApiKeys();
    } catch (err) {
      setError('Failed to create API key. Please try again.');
      console.error('Error creating API key:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Key className="w-6 h-6 text-primary" />
            API Key Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Generate and manage API keys for currency conversion
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          New API Key
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {generatedKey && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Key className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-1">API Key Created Successfully</h3>
              <p className="text-sm text-green-700">{generatedKey.warning}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your API Key</label>
            <div className="flex gap-2">
              <div className="flex-1 font-mono text-sm bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
                {showKey ? generatedKey.apiKey : '••••••••••••••••••••••••••••••••'}
              </div>
              <button
                onClick={() => setShowKey(!showKey)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => copyToClipboard(generatedKey.apiKey)}
                className="px-3 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copiedKey ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <button
            onClick={() => setGeneratedKey(null)}
            className="mt-4 text-sm text-green-700 hover:text-green-800 underline"
          >
            Close
          </button>
        </div>
      )}

      {showCreateForm && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New API Key</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Production API Key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate Limit (requests per hour)
              </label>
              <input
                type="number"
                value={newKeyRateLimit}
                onChange={(e) => setNewKeyRateLimit(parseInt(e.target.value) || 1000)}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiration (days, optional)
              </label>
              <input
                type="number"
                value={newKeyExpireDays}
                onChange={(e) => setNewKeyExpireDays(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="Leave empty for no expiration"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={createApiKey}
                disabled={loading}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create API Key'}
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Your API Keys</h3>
          <button
            onClick={fetchApiKeys}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading && apiKeys.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-gray-400" />
            Loading API keys...
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Key className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No API keys yet. Create your first key to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{key.name}</h4>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          key.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {key.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Prefix:</span>{' '}
                        <span className="font-mono">{key.key_prefix}...</span>
                      </p>
                      <p>
                        <span className="font-medium">Rate Limit:</span> {key.rate_limit} requests/hour
                        {' '}
                        <span className="text-gray-500">
                          ({key.request_count} used this hour)
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Last Used:</span> {formatDate(key.last_request_at)}
                      </p>
                      {key.expires_at && (
                        <p>
                          <span className="font-medium">Expires:</span>{' '}
                          <span className={new Date(key.expires_at) < new Date() ? 'text-red-600' : ''}>
                            {formatDate(key.expires_at)}
                          </span>
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Created:</span> {formatDate(key.created_at)}
                      </p>
                    </div>
                  </div>

                  <button
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete API key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

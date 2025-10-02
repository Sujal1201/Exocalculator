import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

export default function CurrencyCalculator() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchRates = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      setError('Unable to load exchange rates. Using approximate values.');
      setRates({
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149.5,
        AUD: 1.53,
        CAD: 1.36,
        CHF: 0.88,
        CNY: 7.24,
        INR: 83.12,
        MXN: 17.05,
        BRL: 4.97,
        ZAR: 18.75,
        SGD: 1.34,
        NZD: 1.65,
        KRW: 1320.5,
      });
      setLastUpdate(new Date());
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const convert = (amount: string, from: string, to: string): string => {
    if (!amount || isNaN(Number(amount)) || !rates[from] || !rates[to]) {
      return '';
    }
    const numAmount = Number(amount);
    const inUSD = numAmount / rates[from];
    const result = inUSD * rates[to];
    return result.toFixed(2);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(convert(value, fromCurrency, toCurrency));
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    setFromAmount(convert(value, toCurrency, fromCurrency));
  };

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    if (fromAmount) {
      setToAmount(convert(fromAmount, currency, toCurrency));
    }
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    if (fromAmount) {
      setToAmount(convert(fromAmount, fromCurrency, currency));
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {lastUpdate && `Last updated: ${lastUpdate.toLocaleTimeString()}`}
        </div>
        <button
          onClick={fetchRates}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
        <div className="flex gap-3">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
          <select
            value={fromCurrency}
            onChange={(e) => handleFromCurrencyChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-lg min-w-[200px]"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={swapCurrencies}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md"
          title="Swap currencies"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
        <div className="flex gap-3">
          <input
            type="number"
            value={toAmount}
            onChange={(e) => handleToAmountChange(e.target.value)}
            placeholder="Result"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
          <select
            value={toCurrency}
            onChange={(e) => handleToCurrencyChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-lg min-w-[200px]"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.code} - {curr.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {fromAmount && toAmount && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-lg font-medium text-gray-800">
            1 {fromCurrency} = {(Number(toAmount) / Number(fromAmount)).toFixed(4)} {toCurrency}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            1 {toCurrency} = {(Number(fromAmount) / Number(toAmount)).toFixed(4)} {fromCurrency}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * @interface ExchangeRates
 * @description Defines the structure for storing exchange rates, where each key is a currency code and the value is its rate.
 */
interface ExchangeRates {
  [key: string]: number;
}

/**
 * @const {Array<object>} currencies
 * @description A list of supported currencies with their codes, names, and symbols.
 */
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

/**
 * @component CurrencyCalculator
 * @description A component for converting amounts between different currencies. It fetches real-time exchange rates from an API and provides a fallback to approximate values if the API fails.
 * @returns {JSX.Element} The rendered currency calculator component.
 */
export default function CurrencyCalculator() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  /**
   * @function fetchRates
   * @description Fetches the latest exchange rates using multiple providers in order:
   * 1. Fawaz Ahmed Currency API (free, no key required)
   * 2. ExchangeRate-API (requires API key)
   * 3. Fallback to approximate values
   */
  const fetchRates = async () => {
    setLoading(true);
    setError('');

    // Try Fawaz Ahmed Currency API first (free, no API key needed)
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
      if (!response.ok) throw new Error('Fawaz API failed');
      const data = await response.json();
      
      // Convert the data format to match our ExchangeRates interface
      const convertedRates: ExchangeRates = {};
      const usdRates = data.usd;
      
      // Convert lowercase currency codes to uppercase and normalize rates
      for (const [currency, rate] of Object.entries(usdRates)) {
        if (typeof rate === 'number') {
          convertedRates[currency.toUpperCase()] = rate;
        }
      }
      
      // Ensure USD is 1
      convertedRates['USD'] = 1;
      
      setRates(convertedRates);
      setLastUpdate(new Date());
      setLoading(false);
      return;
    } catch (fawazError) {
      console.log('Fawaz API failed, trying ExchangeRate-API...');
      
      // Try ExchangeRate-API as fallback
      const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
      if (apiKey) {
        try {
          const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
          if (!response.ok) throw new Error('Failed to fetch rates');
          const data = await response.json();
          if (data.result === 'error') {
            throw new Error(data['error-type']);
          }
          setRates(data.conversion_rates);
          setLastUpdate(new Date());
          setLoading(false);
          return;
        } catch (exchangeError) {
          console.log('ExchangeRate-API failed, using fallback values...');
        }
      }
      
      // Use fallback rates as last resort
      setError('Unable to load live exchange rates. Using approximate values.');
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

  /**
   * @effect
   * @description Fetches the exchange rates when the component mounts.
   */
  useEffect(() => {
    fetchRates();
  }, []);

  /**
   * @function convert
   * @description Converts an amount from one currency to another using the stored exchange rates.
   * @param {string} amount - The amount to convert.
   * @param {string} from - The currency code to convert from.
   * @param {string} to - The currency code to convert to.
   * @returns {string} The converted amount, formatted to two decimal places, or an empty string if the input is invalid.
   */
  const convert = (amount: string, from: string, to: string): string => {
    if (!amount || isNaN(Number(amount)) || !rates[from] || !rates[to]) {
      return '';
    }
    const numAmount = Number(amount);
    const inUSD = numAmount / rates[from];
    const result = inUSD * rates[to];
    return result.toFixed(2);
  };

  /**
   * @function handleFromAmountChange
   * @description Handles changes to the "from" amount input field. Updates the "to" amount by converting the new value.
   * @param {string} value - The new value from the input field.
   */
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(convert(value, fromCurrency, toCurrency));
  };

  /**
   * @function handleToAmountChange
   * @description Handles changes to the "to" amount input field. Updates the "from" amount by converting the new value.
   * @param {string} value - The new value from the input field.
   */
  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    setFromAmount(convert(value, toCurrency, fromCurrency));
  };

  /**
   * @function handleFromCurrencyChange
   * @description Handles changes to the "from" currency selection. Recalculates the "to" amount if a "from" amount is present.
   * @param {string} currency - The new "from" currency code.
   */
  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    if (fromAmount) {
      setToAmount(convert(fromAmount, currency, toCurrency));
    }
  };

  /**
   * @function handleToCurrencyChange
   * @description Handles changes to the "to" currency selection. Recalculates the "to" amount if a "from" amount is present.
   * @param {string} currency - The new "to" currency code.
   */
  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    if (fromAmount) {
      setToAmount(convert(fromAmount, fromCurrency, currency));
    }
  };

  /**
   * @function swapCurrencies
   * @description Swaps the "from" and "to" currencies and their corresponding amounts.
   */
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
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
        <div className="flex flex-col sm:flex-row gap-3">
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
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-lg sm:min-w-[200px]"
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
          className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md"
          title="Swap currencies"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
        <div className="flex flex-col sm:flex-row gap-3">
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
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-lg sm:min-w-[200px]"
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
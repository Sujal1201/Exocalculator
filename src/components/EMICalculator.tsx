import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState<'months' | 'years'>('years');
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    if (principal && rate && tenure) {
      calculateEMI();
    } else {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
    }
  }, [principal, rate, tenure, tenureType]);

  const calculateEMI = () => {
    const P = Number(principal);
    const R = Number(rate) / 12 / 100;
    const N = tenureType === 'years' ? Number(tenure) * 12 : Number(tenure);

    if (P <= 0 || R < 0 || N <= 0) {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
      return;
    }

    if (R === 0) {
      const calculatedEMI = P / N;
      setEmi(calculatedEMI);
      setTotalAmount(P);
      setTotalInterest(0);
      return;
    }

    const calculatedEMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const calculatedTotal = calculatedEMI * N;
    const calculatedInterest = calculatedTotal - P;

    setEmi(calculatedEMI);
    setTotalAmount(calculatedTotal);
    setTotalInterest(calculatedInterest);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const months = tenureType === 'years' ? Number(tenure || 0) * 12 : Number(tenure || 0);
  const principalPercentage = principal && totalAmount ? (Number(principal) / totalAmount) * 100 : 0;
  const interestPercentage = totalInterest && totalAmount ? (totalInterest / totalAmount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4" />
            Loan Amount
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Percent className="w-4 h-4" />
            Interest Rate (per year)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter rate"
            step="0.1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            Loan Tenure
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Duration"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            />
            <select
              value={tenureType}
              onChange={(e) => setTenureType(e.target.value as 'months' | 'years')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>
      </div>

      {emi > 0 && (
        <>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 shadow-lg text-white">
            <div className="text-center">
              <div className="text-sm font-medium opacity-90 mb-2">Monthly EMI</div>
              <div className="text-5xl font-bold">{formatCurrency(emi)}</div>
              <div className="text-sm opacity-75 mt-2">for {months} months</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-2">Principal Amount</div>
              <div className="text-3xl font-bold text-gray-800">{formatCurrency(Number(principal))}</div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-sm font-medium text-gray-600 mb-2">Total Interest</div>
              <div className="text-3xl font-bold text-orange-600">{formatCurrency(totalInterest)}</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-4">Total Payment</div>
            <div className="text-3xl font-bold text-gray-800 mb-6">{formatCurrency(totalAmount)}</div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Principal</span>
                  <span className="font-medium">{principalPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${principalPercentage}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Interest</span>
                  <span className="font-medium">{interestPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${interestPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Loan Summary:</div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>Loan Amount: {formatCurrency(Number(principal))}</div>
              <div>Interest Rate: {rate}% per year</div>
              <div>Loan Period: {months} months ({tenure} {tenureType})</div>
              <div>Monthly EMI: {formatCurrency(emi)}</div>
              <div>Total Interest: {formatCurrency(totalInterest)}</div>
              <div>Total Payment: {formatCurrency(totalAmount)}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

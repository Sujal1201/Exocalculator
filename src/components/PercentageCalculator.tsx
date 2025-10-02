import { useState } from 'react';

export default function PercentageCalculator() {
  const [type, setType] = useState<'basic' | 'increase' | 'decrease' | 'difference'>('basic');

  const [basicValue, setBasicValue] = useState('');
  const [basicPercent, setBasicPercent] = useState('');
  const [basicResult, setBasicResult] = useState('');

  const [changeOriginal, setChangeOriginal] = useState('');
  const [changeNew, setChangeNew] = useState('');
  const [changeResult, setChangeResult] = useState('');

  const [increaseValue, setIncreaseValue] = useState('');
  const [increasePercent, setIncreasePercent] = useState('');
  const [increaseResult, setIncreaseResult] = useState('');

  const [decreaseValue, setDecreaseValue] = useState('');
  const [decreasePercent, setDecreasePercent] = useState('');
  const [decreaseResult, setDecreaseResult] = useState('');

  const calculateBasic = () => {
    if (basicValue && basicPercent) {
      const result = (Number(basicValue) * Number(basicPercent)) / 100;
      setBasicResult(result.toFixed(2));
    } else {
      setBasicResult('');
    }
  };

  const calculateChange = () => {
    if (changeOriginal && changeNew) {
      const change = ((Number(changeNew) - Number(changeOriginal)) / Number(changeOriginal)) * 100;
      setChangeResult(change.toFixed(2));
    } else {
      setChangeResult('');
    }
  };

  const calculateIncrease = () => {
    if (increaseValue && increasePercent) {
      const result = Number(increaseValue) * (1 + Number(increasePercent) / 100);
      setIncreaseResult(result.toFixed(2));
    } else {
      setIncreaseResult('');
    }
  };

  const calculateDecrease = () => {
    if (decreaseValue && decreasePercent) {
      const result = Number(decreaseValue) * (1 - Number(decreasePercent) / 100);
      setDecreaseResult(result.toFixed(2));
    } else {
      setDecreaseResult('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setType('basic')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            type === 'basic'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Basic %
        </button>
        <button
          onClick={() => setType('increase')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            type === 'increase'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Increase
        </button>
        <button
          onClick={() => setType('decrease')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            type === 'decrease'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Decrease
        </button>
        <button
          onClick={() => setType('difference')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            type === 'difference'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          % Change
        </button>
      </div>

      {type === 'basic' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">What is X% of Y?</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
              <input
                type="number"
                value={basicPercent}
                onChange={(e) => {
                  setBasicPercent(e.target.value);
                  setTimeout(calculateBasic, 0);
                }}
                placeholder="Enter %"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Of Value</label>
              <input
                type="number"
                value={basicValue}
                onChange={(e) => {
                  setBasicValue(e.target.value);
                  setTimeout(calculateBasic, 0);
                }}
                placeholder="Enter value"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          {basicResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Result</div>
              <div className="text-3xl font-bold text-blue-600">{basicResult}</div>
              <div className="text-sm text-gray-600 mt-2">
                {basicPercent}% of {basicValue} = {basicResult}
              </div>
            </div>
          )}
        </div>
      )}

      {type === 'increase' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Increase by Percentage</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Value</label>
              <input
                type="number"
                value={increaseValue}
                onChange={(e) => {
                  setIncreaseValue(e.target.value);
                  setTimeout(calculateIncrease, 0);
                }}
                placeholder="Enter value"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Increase By %</label>
              <input
                type="number"
                value={increasePercent}
                onChange={(e) => {
                  setIncreasePercent(e.target.value);
                  setTimeout(calculateIncrease, 0);
                }}
                placeholder="Enter %"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          {increaseResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">New Value</div>
              <div className="text-3xl font-bold text-green-600">{increaseResult}</div>
              <div className="text-sm text-gray-600 mt-2">
                {increaseValue} increased by {increasePercent}% = {increaseResult}
              </div>
            </div>
          )}
        </div>
      )}

      {type === 'decrease' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Decrease by Percentage</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Value</label>
              <input
                type="number"
                value={decreaseValue}
                onChange={(e) => {
                  setDecreaseValue(e.target.value);
                  setTimeout(calculateDecrease, 0);
                }}
                placeholder="Enter value"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Decrease By %</label>
              <input
                type="number"
                value={decreasePercent}
                onChange={(e) => {
                  setDecreasePercent(e.target.value);
                  setTimeout(calculateDecrease, 0);
                }}
                placeholder="Enter %"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          {decreaseResult && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">New Value</div>
              <div className="text-3xl font-bold text-red-600">{decreaseResult}</div>
              <div className="text-sm text-gray-600 mt-2">
                {decreaseValue} decreased by {decreasePercent}% = {decreaseResult}
              </div>
            </div>
          )}
        </div>
      )}

      {type === 'difference' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Percentage Change</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Value</label>
              <input
                type="number"
                value={changeOriginal}
                onChange={(e) => {
                  setChangeOriginal(e.target.value);
                  setTimeout(calculateChange, 0);
                }}
                placeholder="Enter original"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Value</label>
              <input
                type="number"
                value={changeNew}
                onChange={(e) => {
                  setChangeNew(e.target.value);
                  setTimeout(calculateChange, 0);
                }}
                placeholder="Enter new"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          {changeResult && (
            <div className={`border rounded-lg p-4 text-center ${
              Number(changeResult) >= 0
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="text-sm text-gray-600 mb-1">Percentage Change</div>
              <div className={`text-3xl font-bold ${
                Number(changeResult) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {Number(changeResult) >= 0 ? '+' : ''}{changeResult}%
              </div>
              <div className="text-sm text-gray-600 mt-2">
                From {changeOriginal} to {changeNew}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

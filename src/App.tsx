import { useState } from 'react';
import {
  Calculator,
  DollarSign,
  Ruler,
  Square,
  Droplet,
  Weight,
  Thermometer,
  Gauge,
  Wind,
  Zap,
  Binary,
  CreditCard,
  Clock,
  Battery,
  HardDrive,
  Percent,
} from 'lucide-react';
import UnitConverter from './components/UnitConverter';
import CurrencyCalculator from './components/CurrencyCalculator';
import NumberSystemCalculator from './components/NumberSystemCalculator';
import EMICalculator from './components/EMICalculator';
import PercentageCalculator from './components/PercentageCalculator';
import {
  lengthUnits,
  areaUnits,
  volumeUnits,
  weightUnits,
  temperatureUnits,
  speedUnits,
  pressureUnits,
  powerUnits,
  timeUnits,
  energyUnits,
  dataUnits,
} from './utils/conversions';

type CalculatorType =
  | 'currency'
  | 'length'
  | 'area'
  | 'volume'
  | 'weight'
  | 'temperature'
  | 'speed'
  | 'pressure'
  | 'power'
  | 'number-system'
  | 'emi'
  | 'time'
  | 'energy'
  | 'data'
  | 'percentage';

const calculators = [
  {
    id: 'currency' as CalculatorType,
    name: 'Currency',
    description: 'Real-time exchange rates',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    id: 'length' as CalculatorType,
    name: 'Length',
    description: 'Distance conversions',
    icon: Ruler,
    color: 'bg-primary',
  },
  {
    id: 'area' as CalculatorType,
    name: 'Area',
    description: 'Square measurements',
    icon: Square,
    color: 'bg-amber-500',
  },
  {
    id: 'volume' as CalculatorType,
    name: 'Volume',
    description: 'Liquid & dry measurements',
    icon: Droplet,
    color: 'bg-cyan-500',
  },
  {
    id: 'weight' as CalculatorType,
    name: 'Weight',
    description: 'Mass conversions',
    icon: Weight,
    color: 'bg-slate-500',
  },
  {
    id: 'temperature' as CalculatorType,
    name: 'Temperature',
    description: 'Heat measurements',
    icon: Thermometer,
    color: 'bg-red-500',
  },
  {
    id: 'speed' as CalculatorType,
    name: 'Speed',
    description: 'Velocity conversions',
    icon: Gauge,
    color: 'bg-orange-500',
  },
  {
    id: 'pressure' as CalculatorType,
    name: 'Pressure',
    description: 'Force per unit area',
    icon: Wind,
    color: 'bg-sky-500',
  },
  {
    id: 'power' as CalculatorType,
    name: 'Power',
    description: 'Energy rate conversions',
    icon: Zap,
    color: 'bg-yellow-500',
  },
  {
    id: 'time' as CalculatorType,
    name: 'Time',
    description: 'Duration conversions',
    icon: Clock,
    color: 'bg-teal-500',
  },
  {
    id: 'energy' as CalculatorType,
    name: 'Energy',
    description: 'Work & heat conversions',
    icon: Battery,
    color: 'bg-lime-500',
  },
  {
    id: 'data' as CalculatorType,
    name: 'Data Storage',
    description: 'Digital information size',
    icon: HardDrive,
    color: 'bg-gray-500',
  },
  {
    id: 'number-system' as CalculatorType,
    name: 'Number System',
    description: 'Binary, hex, decimal, octal',
    icon: Binary,
    color: 'bg-violet-500',
  },
  {
    id: 'emi' as CalculatorType,
    name: 'EMI Calculator',
    description: 'Loan & mortgage planning',
    icon: CreditCard,
    color: 'bg-pink-500',
  },
  {
    id: 'percentage' as CalculatorType,
    name: 'Percentage',
    description: 'Percent calculations',
    icon: Percent,
    color: 'bg-emerald-500',
  },
];

function App() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('currency');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'currency':
        return <CurrencyCalculator />;
      case 'length':
        return <UnitConverter category={lengthUnits} />;
      case 'area':
        return <UnitConverter category={areaUnits} />;
      case 'volume':
        return <UnitConverter category={volumeUnits} />;
      case 'weight':
        return <UnitConverter category={weightUnits} />;
      case 'temperature':
        return <UnitConverter category={temperatureUnits} />;
      case 'speed':
        return <UnitConverter category={speedUnits} />;
      case 'pressure':
        return <UnitConverter category={pressureUnits} />;
      case 'power':
        return <UnitConverter category={powerUnits} />;
      case 'time':
        return <UnitConverter category={timeUnits} />;
      case 'energy':
        return <UnitConverter category={energyUnits} />;
      case 'data':
        return <UnitConverter category={dataUnits} />;
      case 'number-system':
        return <NumberSystemCalculator />;
      case 'emi':
        return <EMICalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      default:
        return <CurrencyCalculator />;
    }
  };

  const activeCalc = calculators.find((c) => c.id === activeCalculator);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Calculator Suite</h1>
                <p className="text-sm text-gray-600">Professional conversion tools</p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside
            className={`lg:w-80 ${
              menuOpen ? 'block' : 'hidden'
            } lg:block space-y-2 lg:sticky lg:top-24 lg:self-start`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Calculators
              </h2>
              <div className="space-y-1">
                {calculators.map((calc) => {
                  const Icon = calc.icon;
                  const isActive = activeCalculator === calc.id;
                  return (
                    <button
                      key={calc.id}
                      onClick={() => {
                        setActiveCalculator(calc.id);
                        setMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          isActive ? 'bg-blue-100' : 'bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{calc.name}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {calc.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                {activeCalc && (
                  <>
                    <div className={`p-3 ${activeCalc.color} rounded-lg`}>
                      <activeCalc.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {activeCalc.name} Calculator
                      </h2>
                      <p className="text-sm text-gray-600">{activeCalc.description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>{renderCalculator()}</div>
          </main>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Professional calculator suite with {calculators.length} specialized tools
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Accurate conversions for currency, measurements, and calculations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

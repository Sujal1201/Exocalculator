import { useParams, Link } from 'react-router-dom';
import { calculators, CalculatorType } from '../data/calculators';
import UnitConverter from '../components/UnitConverter';
import CurrencyCalculator from '../components/CurrencyCalculator';
import NumberSystemCalculator from '../components/NumberSystemCalculator';
import EMICalculator from '../components/EMICalculator';
import PercentageCalculator from '../components/PercentageCalculator';
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
} from '../utils/conversions';
import { ArrowLeft, Calculator } from 'lucide-react';

const CalculatorPage = () => {
  const { id } = useParams<{ id: CalculatorType }>();
  const activeCalculator = calculators.find((c) => c.id === id);

  const renderCalculator = () => {
    switch (id) {
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
        return (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-800">Calculator not found</h2>
            <p className="text-gray-600 mt-2">
              Please select a valid calculator from the home page.
            </p>
          </div>
        );
    }
  };

  if (!activeCalculator) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-700 mb-8">
          The calculator you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    );
  }

  const { name, description, color, icon: Icon } = activeCalculator;

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
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all calculators
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 ${color} rounded-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{name} Calculator</h2>
              <p className="text-base text-gray-600">{description}</p>
            </div>
          </div>
        </div>

        <div>{renderCalculator()}</div>
      </main>
    </div>
  );
};

export default CalculatorPage;
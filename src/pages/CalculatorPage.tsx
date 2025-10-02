import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

/**
 * @component CalculatorPage
 * @description A page that displays the specific calculator selected by the user.
 * It uses the URL parameter `id` to determine which calculator to render.
 * If the `id` is invalid, it displays a "not found" message.
 * @returns {JSX.Element} The rendered calculator page or a not-found message.
 */
const CalculatorPage = () => {
  const { id } = useParams<{ id: string }>();
  const activeCalculator = calculators.find((c) => c.id === id);

  /**
   * @function renderCalculator
   * @description A factory function that returns the appropriate calculator component based on the URL `id`.
   * @returns {JSX.Element} The specific calculator component or a "not found" message.
   */
  const renderCalculator = () => {
    switch (id as CalculatorType) {
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
      <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-gray-800">Calculator not found</h2>
          <p className="text-gray-600 mt-2">
            The calculator you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
      </div>
    );
  }

  const { name, description, color, icon: Icon } = activeCalculator;

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all calculators
        </Link>
        <div className="flex items-center gap-4">
          <div className={`p-3 ${color} rounded-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {name} Calculator
            </h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      {renderCalculator()}
    </div>
  );
};

export default CalculatorPage;
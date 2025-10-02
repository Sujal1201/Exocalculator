import { useState } from 'react';
import { CalculatorCategory } from '../types/calculator';

/**
 * @interface UnitConverterProps
 * @description Defines the props for the UnitConverter component.
 * @property {CalculatorCategory} category - The category of units to be converted (e.g., length, weight).
 */
interface UnitConverterProps {
  category: CalculatorCategory;
}

/**
 * @component UnitConverter
 * @description A generic component for converting values between different units within a given category.
 * It uses a base conversion system where each unit knows how to convert to and from a common base unit.
 * @param {UnitConverterProps} props - The props for the component.
 * @returns {JSX.Element} The rendered unit converter component.
 */
export default function UnitConverter({ category }: UnitConverterProps) {
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  /**
   * @function handleFromValueChange
   * @description Handles changes in the "from" value input. Converts the value to the selected "to" unit.
   * @param {string} value - The new input value.
   */
  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    if (value === '' || isNaN(Number(value))) {
      setToValue('');
      return;
    }
    const numValue = Number(value);
    const baseValue = category.units[fromUnit].toBase(numValue);
    const convertedValue = category.units[toUnit].fromBase(baseValue);
    setToValue(convertedValue.toFixed(8).replace(/\.?0+$/, ''));
  };

  /**
   * @function handleToValueChange
   * @description Handles changes in the "to" value input. Converts the value back to the selected "from" unit.
   * @param {string} value - The new input value.
   */
  const handleToValueChange = (value: string) => {
    setToValue(value);
    if (value === '' || isNaN(Number(value))) {
      setFromValue('');
      return;
    }
    const numValue = Number(value);
    const baseValue = category.units[toUnit].toBase(numValue);
    const convertedValue = category.units[fromUnit].fromBase(baseValue);
    setFromValue(convertedValue.toFixed(8).replace(/\.?0+$/, ''));
  };

  /**
   * @function handleFromUnitChange
   * @description Handles changes in the "from" unit selection. Recalculates the conversion based on the new unit.
   * @param {number} index - The index of the newly selected "from" unit.
   */
  const handleFromUnitChange = (index: number) => {
    setFromUnit(index);
    if (fromValue) {
      const numValue = Number(fromValue);
      const baseValue = category.units[index].toBase(numValue);
      const convertedValue = category.units[toUnit].fromBase(baseValue);
      setToValue(convertedValue.toFixed(8).replace(/\.?0+$/, ''));
    }
  };

  /**
   * @function handleToUnitChange
   * @description Handles changes in the "to" unit selection. Recalculates the conversion based on the new unit.
   * @param {number} index - The index of the newly selected "to" unit.
   */
  const handleToUnitChange = (index: number) => {
    setToUnit(index);
    if (fromValue) {
      const numValue = Number(fromValue);
      const baseValue = category.units[fromUnit].toBase(numValue);
      const convertedValue = category.units[index].fromBase(baseValue);
      setToValue(convertedValue.toFixed(8).replace(/\.?0+$/, ''));
    }
  };

  /**
   * @function swapUnits
   * @description Swaps the "from" and "to" units and their corresponding values.
   */
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="number"
            value={fromValue}
            onChange={(e) => handleFromValueChange(e.target.value)}
            placeholder="Enter value"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
          <select
            value={fromUnit}
            onChange={(e) => handleFromUnitChange(Number(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-lg"
          >
            {category.units.map((unit, index) => (
              <option key={index} value={index}>
                {unit.name} ({unit.abbreviation})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={swapUnits}
          className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors shadow-md"
          title="Swap units"
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
            value={toValue}
            onChange={(e) => handleToValueChange(e.target.value)}
            placeholder="Result"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
          <select
            value={toUnit}
            onChange={(e) => handleToUnitChange(Number(e.target.value))}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-lg"
          >
            {category.units.map((unit, index) => (
              <option key={index} value={index}>
                {unit.name} ({unit.abbreviation})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
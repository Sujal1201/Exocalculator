import { useState } from 'react';

/**
 * @typedef {'binary' | 'decimal' | 'hexadecimal' | 'octal'} NumberBase
 * @description A type representing the supported number bases for conversion.
 */
type NumberBase = 'binary' | 'decimal' | 'hexadecimal' | 'octal';

/**
 * @const {Array<object>} bases
 * @description An array of objects, each defining a number base with its properties.
 */
const bases = [
  { id: 'binary' as NumberBase, name: 'Binary', base: 2, prefix: '0b' },
  { id: 'decimal' as NumberBase, name: 'Decimal', base: 10, prefix: '' },
  { id: 'hexadecimal' as NumberBase, name: 'Hexadecimal', base: 16, prefix: '0x' },
  { id: 'octal' as NumberBase, name: 'Octal', base: 8, prefix: '0o' },
];

/**
 * @component NumberSystemCalculator
 * @description A component for converting numbers between different number systems (binary, decimal, hexadecimal, and octal).
 * It validates user input and updates all fields simultaneously when a valid number is entered in any base.
 * @returns {JSX.Element} The rendered number system calculator component.
 */
export default function NumberSystemCalculator() {
  const [values, setValues] = useState<Record<NumberBase, string>>({
    binary: '',
    decimal: '',
    hexadecimal: '',
    octal: '',
  });
  const [error, setError] = useState('');

  /**
   * @function isValidNumber
   * @description Validates if a given string is a valid number for a specified base.
   * @param {string} value - The number string to validate.
   * @param {number} base - The base to validate against (e.g., 2 for binary, 16 for hexadecimal).
   * @returns {boolean} True if the number is valid, false otherwise.
   */
  const isValidNumber = (value: string, base: number): boolean => {
    if (!value) return true;
    if (base === 2) return /^[01]+$/.test(value);
    if (base === 8) return /^[0-7]+$/.test(value);
    if (base === 10) return /^[0-9]+$/.test(value);
    if (base === 16) return /^[0-9A-Fa-f]+$/.test(value);
    return false;
  };

  /**
   * @function handleChange
   * @description Handles input changes for any of the number base fields.
   * It validates the input, and if valid, converts the number to all other bases and updates the state.
   * @param {NumberBase} baseType - The base of the input field that changed.
   * @param {string} value - The new value from the input field.
   */
  const handleChange = (baseType: NumberBase, value: string) => {
    const base = bases.find(b => b.id === baseType)!;

    if (!isValidNumber(value, base.base)) {
      setError(`Invalid ${base.name} number`);
      return;
    }

    setError('');

    if (!value) {
      setValues({
        binary: '',
        decimal: '',
        hexadecimal: '',
        octal: '',
      });
      return;
    }

    try {
      const decimalValue = parseInt(value, base.base);

      if (isNaN(decimalValue) || decimalValue < 0) {
        setError('Invalid number');
        return;
      }

      setValues({
        binary: decimalValue.toString(2),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        octal: decimalValue.toString(8),
      });
    } catch {
      setError('Conversion error');
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {bases.map((base) => (
          <div key={base.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {base.name} (Base {base.base})
            </label>
            <div className="flex items-center gap-3">
              {base.prefix && (
                <span className="text-gray-500 font-mono text-lg">{base.prefix}</span>
              )}
              <input
                type="text"
                value={values[base.id]}
                onChange={(e) => handleChange(base.id, e.target.value)}
                placeholder={`Enter ${base.name.toLowerCase()} number`}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg font-mono"
              />
            </div>
            {base.id === 'binary' && (
              <div className="mt-2 text-xs text-gray-500">Valid digits: 0, 1</div>
            )}
            {base.id === 'octal' && (
              <div className="mt-2 text-xs text-gray-500">Valid digits: 0-7</div>
            )}
            {base.id === 'decimal' && (
              <div className="mt-2 text-xs text-gray-500">Valid digits: 0-9</div>
            )}
            {base.id === 'hexadecimal' && (
              <div className="mt-2 text-xs text-gray-500">Valid digits: 0-9, A-F</div>
            )}
          </div>
        ))}
      </div>

      {values.decimal && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Quick Reference:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>Binary digits: {values.binary.length}</div>
            <div>Hex digits: {values.hexadecimal.length}</div>
            <div>Decimal value: {parseInt(values.decimal).toLocaleString()}</div>
            <div>Octal digits: {values.octal.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
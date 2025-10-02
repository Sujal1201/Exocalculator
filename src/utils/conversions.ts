import { CalculatorCategory } from '../types/calculator';

// Length conversions (base unit: meters)
export const lengthUnits: CalculatorCategory = {
  id: 'length',
  name: 'Length / Distance',
  icon: 'Ruler',
  units: [
    {
      name: 'Millimeters',
      abbreviation: 'mm',
      toBase: (val) => val / 1000,
      fromBase: (val) => val * 1000,
    },
    {
      name: 'Centimeters',
      abbreviation: 'cm',
      toBase: (val) => val / 100,
      fromBase: (val) => val * 100,
    },
    {
      name: 'Meters',
      abbreviation: 'm',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Kilometers',
      abbreviation: 'km',
      toBase: (val) => val * 1000,
      fromBase: (val) => val / 1000,
    },
    {
      name: 'Inches',
      abbreviation: 'in',
      toBase: (val) => val * 0.0254,
      fromBase: (val) => val / 0.0254,
    },
    {
      name: 'Feet',
      abbreviation: 'ft',
      toBase: (val) => val * 0.3048,
      fromBase: (val) => val / 0.3048,
    },
    {
      name: 'Yards',
      abbreviation: 'yd',
      toBase: (val) => val * 0.9144,
      fromBase: (val) => val / 0.9144,
    },
    {
      name: 'Miles',
      abbreviation: 'mi',
      toBase: (val) => val * 1609.34,
      fromBase: (val) => val / 1609.34,
    },
    {
      name: 'Nautical Miles',
      abbreviation: 'nmi',
      toBase: (val) => val * 1852,
      fromBase: (val) => val / 1852,
    },
  ],
};

// Area conversions (base unit: square meters)
export const areaUnits: CalculatorCategory = {
  id: 'area',
  name: 'Area',
  icon: 'Square',
  units: [
    {
      name: 'Square Millimeters',
      abbreviation: 'mm²',
      toBase: (val) => val / 1000000,
      fromBase: (val) => val * 1000000,
    },
    {
      name: 'Square Centimeters',
      abbreviation: 'cm²',
      toBase: (val) => val / 10000,
      fromBase: (val) => val * 10000,
    },
    {
      name: 'Square Meters',
      abbreviation: 'm²',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Hectares',
      abbreviation: 'ha',
      toBase: (val) => val * 10000,
      fromBase: (val) => val / 10000,
    },
    {
      name: 'Square Kilometers',
      abbreviation: 'km²',
      toBase: (val) => val * 1000000,
      fromBase: (val) => val / 1000000,
    },
    {
      name: 'Square Inches',
      abbreviation: 'in²',
      toBase: (val) => val * 0.00064516,
      fromBase: (val) => val / 0.00064516,
    },
    {
      name: 'Square Feet',
      abbreviation: 'ft²',
      toBase: (val) => val * 0.092903,
      fromBase: (val) => val / 0.092903,
    },
    {
      name: 'Square Yards',
      abbreviation: 'yd²',
      toBase: (val) => val * 0.836127,
      fromBase: (val) => val / 0.836127,
    },
    {
      name: 'Acres',
      abbreviation: 'ac',
      toBase: (val) => val * 4046.86,
      fromBase: (val) => val / 4046.86,
    },
    {
      name: 'Square Miles',
      abbreviation: 'mi²',
      toBase: (val) => val * 2589988,
      fromBase: (val) => val / 2589988,
    },
  ],
};

// Volume conversions (base unit: liters)
export const volumeUnits: CalculatorCategory = {
  id: 'volume',
  name: 'Volume',
  icon: 'Droplet',
  units: [
    {
      name: 'Milliliters',
      abbreviation: 'ml',
      toBase: (val) => val / 1000,
      fromBase: (val) => val * 1000,
    },
    {
      name: 'Liters',
      abbreviation: 'L',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Cubic Meters',
      abbreviation: 'm³',
      toBase: (val) => val * 1000,
      fromBase: (val) => val / 1000,
    },
    {
      name: 'US Fluid Ounces',
      abbreviation: 'fl oz',
      toBase: (val) => val * 0.0295735,
      fromBase: (val) => val / 0.0295735,
    },
    {
      name: 'US Cups',
      abbreviation: 'cup',
      toBase: (val) => val * 0.236588,
      fromBase: (val) => val / 0.236588,
    },
    {
      name: 'US Pints',
      abbreviation: 'pt',
      toBase: (val) => val * 0.473176,
      fromBase: (val) => val / 0.473176,
    },
    {
      name: 'US Quarts',
      abbreviation: 'qt',
      toBase: (val) => val * 0.946353,
      fromBase: (val) => val / 0.946353,
    },
    {
      name: 'US Gallons',
      abbreviation: 'gal',
      toBase: (val) => val * 3.78541,
      fromBase: (val) => val / 3.78541,
    },
    {
      name: 'Imperial Gallons',
      abbreviation: 'imp gal',
      toBase: (val) => val * 4.54609,
      fromBase: (val) => val / 4.54609,
    },
    {
      name: 'Cubic Inches',
      abbreviation: 'in³',
      toBase: (val) => val * 0.0163871,
      fromBase: (val) => val / 0.0163871,
    },
    {
      name: 'Cubic Feet',
      abbreviation: 'ft³',
      toBase: (val) => val * 28.3168,
      fromBase: (val) => val / 28.3168,
    },
  ],
};

// Weight conversions (base unit: kilograms)
export const weightUnits: CalculatorCategory = {
  id: 'weight',
  name: 'Weight / Mass',
  icon: 'Weight',
  units: [
    {
      name: 'Milligrams',
      abbreviation: 'mg',
      toBase: (val) => val / 1000000,
      fromBase: (val) => val * 1000000,
    },
    {
      name: 'Grams',
      abbreviation: 'g',
      toBase: (val) => val / 1000,
      fromBase: (val) => val * 1000,
    },
    {
      name: 'Kilograms',
      abbreviation: 'kg',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Metric Tons',
      abbreviation: 't',
      toBase: (val) => val * 1000,
      fromBase: (val) => val / 1000,
    },
    {
      name: 'Ounces',
      abbreviation: 'oz',
      toBase: (val) => val * 0.0283495,
      fromBase: (val) => val / 0.0283495,
    },
    {
      name: 'Pounds',
      abbreviation: 'lb',
      toBase: (val) => val * 0.453592,
      fromBase: (val) => val / 0.453592,
    },
    {
      name: 'Stones',
      abbreviation: 'st',
      toBase: (val) => val * 6.35029,
      fromBase: (val) => val / 6.35029,
    },
    {
      name: 'US Tons',
      abbreviation: 'ton',
      toBase: (val) => val * 907.185,
      fromBase: (val) => val / 907.185,
    },
  ],
};

// Temperature conversions (special case - not using base unit system)
export const temperatureUnits: CalculatorCategory = {
  id: 'temperature',
  name: 'Temperature',
  icon: 'Thermometer',
  units: [
    {
      name: 'Celsius',
      abbreviation: '°C',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Fahrenheit',
      abbreviation: '°F',
      toBase: (val) => (val - 32) * 5 / 9,
      fromBase: (val) => val * 9 / 5 + 32,
    },
    {
      name: 'Kelvin',
      abbreviation: 'K',
      toBase: (val) => val - 273.15,
      fromBase: (val) => val + 273.15,
    },
    {
      name: 'Rankine',
      abbreviation: '°R',
      toBase: (val) => (val - 491.67) * 5 / 9,
      fromBase: (val) => val * 9 / 5 + 491.67,
    },
  ],
};

// Speed conversions (base unit: meters per second)
export const speedUnits: CalculatorCategory = {
  id: 'speed',
  name: 'Speed / Velocity',
  icon: 'Gauge',
  units: [
    {
      name: 'Meters per Second',
      abbreviation: 'm/s',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Kilometers per Hour',
      abbreviation: 'km/h',
      toBase: (val) => val / 3.6,
      fromBase: (val) => val * 3.6,
    },
    {
      name: 'Miles per Hour',
      abbreviation: 'mph',
      toBase: (val) => val * 0.44704,
      fromBase: (val) => val / 0.44704,
    },
    {
      name: 'Feet per Second',
      abbreviation: 'ft/s',
      toBase: (val) => val * 0.3048,
      fromBase: (val) => val / 0.3048,
    },
    {
      name: 'Knots',
      abbreviation: 'kn',
      toBase: (val) => val * 0.514444,
      fromBase: (val) => val / 0.514444,
    },
    {
      name: 'Mach',
      abbreviation: 'Ma',
      toBase: (val) => val * 343,
      fromBase: (val) => val / 343,
    },
  ],
};

// Pressure conversions (base unit: pascals)
export const pressureUnits: CalculatorCategory = {
  id: 'pressure',
  name: 'Pressure',
  icon: 'Wind',
  units: [
    {
      name: 'Pascals',
      abbreviation: 'Pa',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Kilopascals',
      abbreviation: 'kPa',
      toBase: (val) => val * 1000,
      fromBase: (val) => val / 1000,
    },
    {
      name: 'Bar',
      abbreviation: 'bar',
      toBase: (val) => val * 100000,
      fromBase: (val) => val / 100000,
    },
    {
      name: 'PSI',
      abbreviation: 'psi',
      toBase: (val) => val * 6894.76,
      fromBase: (val) => val / 6894.76,
    },
    {
      name: 'Atmospheres',
      abbreviation: 'atm',
      toBase: (val) => val * 101325,
      fromBase: (val) => val / 101325,
    },
    {
      name: 'Torr',
      abbreviation: 'torr',
      toBase: (val) => val * 133.322,
      fromBase: (val) => val / 133.322,
    },
    {
      name: 'mmHg',
      abbreviation: 'mmHg',
      toBase: (val) => val * 133.322,
      fromBase: (val) => val / 133.322,
    },
  ],
};

// Power conversions (base unit: watts)
export const powerUnits: CalculatorCategory = {
  id: 'power',
  name: 'Power',
  icon: 'Zap',
  units: [
    {
      name: 'Watts',
      abbreviation: 'W',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Kilowatts',
      abbreviation: 'kW',
      toBase: (val) => val * 1000,
      fromBase: (val) => val / 1000,
    },
    {
      name: 'Megawatts',
      abbreviation: 'MW',
      toBase: (val) => val * 1000000,
      fromBase: (val) => val / 1000000,
    },
    {
      name: 'Horsepower (Mechanical)',
      abbreviation: 'hp',
      toBase: (val) => val * 745.7,
      fromBase: (val) => val / 745.7,
    },
    {
      name: 'BTU per Hour',
      abbreviation: 'BTU/h',
      toBase: (val) => val * 0.293071,
      fromBase: (val) => val / 0.293071,
    },
    {
      name: 'Calories per Second',
      abbreviation: 'cal/s',
      toBase: (val) => val * 4.184,
      fromBase: (val) => val / 4.184,
    },
  ],
};

// Time conversions (base unit: seconds)
export const timeUnits: CalculatorCategory = {
  id: 'time',
  name: 'Time',
  icon: 'Clock',
  units: [
    {
      name: 'Milliseconds',
      abbreviation: 'ms',
      toBase: (val) => val / 1000,
      fromBase: (val) => val * 1000,
    },
    {
      name: 'Seconds',
      abbreviation: 's',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Minutes',
      abbreviation: 'min',
      toBase: (val) => val * 60,
      fromBase: (val) => val / 60,
    },
    {
      name: 'Hours',
      abbreviation: 'h',
      toBase: (val) => val * 3600,
      fromBase: (val) => val / 3600,
    },
    {
      name: 'Days',
      abbreviation: 'd',
      toBase: (val) => val * 86400,
      fromBase: (val) => val / 86400,
    },
    {
      name: 'Weeks',
      abbreviation: 'wk',
      toBase: (val) => val * 604800,
      fromBase: (val) => val / 604800,
    },
    {
      name: 'Months (30 days)',
      abbreviation: 'mo',
      toBase: (val) => val * 2592000,
      fromBase: (val) => val / 2592000,
    },
    {
      name: 'Years (365 days)',
      abbreviation: 'yr',
      toBase: (val) => val * 31536000,
      fromBase: (val) => val / 31536000,
    },
  ],
};

// Energy conversions (base unit: joules)
export const energyUnits: CalculatorCategory = {
  id: 'energy',
  name: 'Energy',
  icon: 'Battery',
  units: [
    {
      name: 'Joules',
      abbreviation: 'J',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Kilojoules',
      abbreviation: 'kJ',
      toBase: (val) => val * 1000,
      fromBase: (val) => val / 1000,
    },
    {
      name: 'Calories',
      abbreviation: 'cal',
      toBase: (val) => val * 4.184,
      fromBase: (val) => val / 4.184,
    },
    {
      name: 'Kilocalories',
      abbreviation: 'kcal',
      toBase: (val) => val * 4184,
      fromBase: (val) => val / 4184,
    },
    {
      name: 'Watt-hours',
      abbreviation: 'Wh',
      toBase: (val) => val * 3600,
      fromBase: (val) => val / 3600,
    },
    {
      name: 'Kilowatt-hours',
      abbreviation: 'kWh',
      toBase: (val) => val * 3600000,
      fromBase: (val) => val / 3600000,
    },
    {
      name: 'BTU',
      abbreviation: 'BTU',
      toBase: (val) => val * 1055.06,
      fromBase: (val) => val / 1055.06,
    },
    {
      name: 'Electronvolts',
      abbreviation: 'eV',
      toBase: (val) => val * 1.60218e-19,
      fromBase: (val) => val / 1.60218e-19,
    },
  ],
};

// Data storage conversions (base unit: bytes)
export const dataUnits: CalculatorCategory = {
  id: 'data',
  name: 'Data Storage',
  icon: 'HardDrive',
  units: [
    {
      name: 'Bits',
      abbreviation: 'bit',
      toBase: (val) => val / 8,
      fromBase: (val) => val * 8,
    },
    {
      name: 'Bytes',
      abbreviation: 'B',
      toBase: (val) => val,
      fromBase: (val) => val,
    },
    {
      name: 'Kilobytes',
      abbreviation: 'KB',
      toBase: (val) => val * 1024,
      fromBase: (val) => val / 1024,
    },
    {
      name: 'Megabytes',
      abbreviation: 'MB',
      toBase: (val) => val * 1048576,
      fromBase: (val) => val / 1048576,
    },
    {
      name: 'Gigabytes',
      abbreviation: 'GB',
      toBase: (val) => val * 1073741824,
      fromBase: (val) => val / 1073741824,
    },
    {
      name: 'Terabytes',
      abbreviation: 'TB',
      toBase: (val) => val * 1099511627776,
      fromBase: (val) => val / 1099511627776,
    },
    {
      name: 'Petabytes',
      abbreviation: 'PB',
      toBase: (val) => val * 1125899906842624,
      fromBase: (val) => val / 1125899906842624,
    },
  ],
};

export const allCategories = [
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
];

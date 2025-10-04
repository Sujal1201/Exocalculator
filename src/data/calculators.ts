import {
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
  Banknote,
} from 'lucide-react';

/**
 * @typedef {'currency' | 'length' | ... | 'percentage'} CalculatorType
 * @description A union type that represents the unique identifier for each calculator available in the application.
 */
export type CalculatorType =
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
  | 'percentage'
  | 'money';

/**
 * @const {Array<object>} calculators
 * @description An array of objects that serves as the central data source for all calculators in the application.
 * Each object defines the properties of a calculator, such as its ID, name, description, icon, and color,
 * which are used to dynamically render the calculator list and pages.
 */
export const calculators = [
  {
    id: 'money' as CalculatorType,
    name: 'cash Counter',
    description: 'Open notecounter.shop',
    externalUrl: 'https://notecounter.shop',
    icon: Banknote,
    color: 'bg-emerald-500',
  },
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
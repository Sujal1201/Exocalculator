export interface ConversionUnit {
  name: string;
  abbreviation: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface CalculatorCategory {
  id: string;
  name: string;
  icon: string;
  units: ConversionUnit[];
}

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
  | 'percentage';

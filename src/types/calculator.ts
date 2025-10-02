/**
 * @interface ConversionUnit
 * @description Defines the structure for a single unit of measurement used in the UnitConverter component.
 * @property {string} name - The full name of the unit (e.g., "Meter").
 * @property {string} abbreviation - The common abbreviation for the unit (e.g., "m").
 * @property {(value: number) => number} toBase - A function to convert a value from this unit to the category's base unit.
 * @property {(value: number) => number} fromBase - A function to convert a value from the category's base unit to this unit.
 */
export interface ConversionUnit {
  name: string;
  abbreviation: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

/**
 * @interface CalculatorCategory
 * @description Defines a category of unit conversions, such as length, weight, or temperature.
 * @property {string} id - A unique identifier for the category.
 * @property {string} name - The display name of the category (e.g., "Length").
 * @property {string} icon - The name or identifier for the icon representing the category.
 * @property {ConversionUnit[]} units - An array of `ConversionUnit` objects that belong to this category.
 */
export interface CalculatorCategory {
  id: string;
  name: string;
  icon: string;
  units: ConversionUnit[];
}

/**
 * @typedef {'currency' | 'length' | ... | 'percentage'} CalculatorType
 * @description A union type that represents the unique identifier for each calculator available in the application.
 * This is used for routing and rendering the correct calculator component.
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
  | 'percentage';
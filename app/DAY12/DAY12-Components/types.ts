export type ConversionFunction = (value: number) => number;

export interface UnitConversions {
  [unit: string]: {
    [targetUnit: string]: ConversionFunction;
  };
}
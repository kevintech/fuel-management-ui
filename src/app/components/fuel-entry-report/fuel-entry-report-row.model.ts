
export interface FuelEntryReportRow {
  plate: string;
  code: string;
  diesel: Diesel;
  gasoline: number;
  oil15W40: number;
  oilW30Cat: number;
  oil15W40Cat: number;
  oil20W50: number;
  oil85W140: number;
  oil80W90: number;
  oil30: number;
  atf: string;
  cooling: string;
  grease: number;
}

interface Diesel {
  day: number,
  night: number,
}
import { TankMeasurement } from './tank-measurement.model'
import { BombMeter } from './bomb-meter.model'
import { SupplyStation } from '../supply-station/supply-station.model'
import { FuelEntryDetail } from './fuel-entry-detail.model';

export interface FuelEntry {
  timestamp: number;
  date: string;
  measureTanks: TankMeasurement;
  bombMeter: BombMeter;
  supplyStation: SupplyStation;
  detail: Array<FuelEntryDetail>;
}

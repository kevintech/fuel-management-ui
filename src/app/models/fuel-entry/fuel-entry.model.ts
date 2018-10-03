import { TankMeasurement } from './tank-measurement.model'
import { BombMeter } from './bomb-meter.model'
import { SupplyStation } from '../supply-station/supply-station.model'

export class FuelEntry {
  date: string
  measureTanks: TankMeasurement
  bombMeter: BombMeter
  supplyStation: SupplyStation
}

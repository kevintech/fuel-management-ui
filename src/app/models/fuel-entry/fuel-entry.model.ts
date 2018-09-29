import { TankMeasurement } from './tank-measurement.model'
import { BombMeter } from './bomb-meter.model'

export class FuelEntry {
  date: string
  measureTanks: TankMeasurement
  bombMeter: BombMeter
}

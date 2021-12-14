import { IDevice } from "./IDevice"

export interface IMeasurement {
  _id: string
  __v: number
  device_id: IDevice['_id']
  measurement: Number
  time: Date
  type: string
}

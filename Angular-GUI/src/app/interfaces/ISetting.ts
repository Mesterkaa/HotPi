import { SETTING } from "../helper/setting.const"

export interface ISetting {
  _id: string
  __v: number
  name: SETTING
  value: any
}

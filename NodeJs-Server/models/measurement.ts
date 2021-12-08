import { Document, Schema, Model, model, Error } from "mongoose";
import { Device, IDevice } from "./device";
import { TYPE } from "../lib/measurement_types";
import { Setting } from "./setting";
import { SETTING } from "../lib/settings";
import { MailService } from "../services/mailService";
import { DB_NAME } from "lib/db_name";


export interface IMeasurement extends Document {
    device_id: IDevice['_id']
    measurement: Number
    time: Date
    type: string
}

export const measurementSchema: Schema = new Schema({
  device_id: {
    type: Schema.Types.ObjectId,
    ref: DB_NAME.DEVICE,
    required: true
  },
  measurement: {type: Number, required: true},
  time: {type: Date, default: () => {return new Date()}, required: true },
  type: {type: String, required: true},
});

measurementSchema.pre<IMeasurement>("save", async function save(next) {

  let max_string = "";
  let min_string = "";
  switch(this.type) {
    case TYPE.TEMP:
      max_string = SETTING.MAX_TEMP;
      min_string = SETTING.MIN_TEMP;
      break;
    case TYPE.HUMI:
      max_string = SETTING.MAX_HUMI;
      min_string = SETTING.MIN_HUMI;
      break;
    case TYPE.PRES:
      max_string = SETTING.MAX_PRES;
      min_string = SETTING.MIN_PRES;
      break;
    default:
      break;
  }

  const range = await Setting.find({name: { $in: [max_string, min_string]}});
  const max = range.find(e => e.name == max_string)?.value;
  const min = range.find(e => e.name == min_string)?.value;

  if (this.measurement < min || this.measurement > max) {

    const device = (await Device.findById(this.device_id))?.name;
    const unit = this.type == TYPE.TEMP ? '°C' : this.type == TYPE.HUMI ? '%' : 'hPa'
    const message = `Enheden: "${device}" målte en værdi uden for den acceptable rækkevidde. 
    ${this.measurement} ${unit} er uden for rækkevidden: ${min} ${unit} til ${max} ${unit}.`;

    MailService.sendAlarmMail(message);
  }

  next();
})

export const Measurement: Model<IMeasurement> = model<IMeasurement>(DB_NAME.MEASUREMENT, measurementSchema);


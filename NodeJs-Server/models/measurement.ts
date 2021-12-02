import { Document, Schema, Model, model, Error } from "mongoose";
import { IDevice } from "./device";


export interface IMeasurement extends Document {
    device_id: IDevice['_id']
    measurement: Number
    time: Date
    type: string
}

export const measurementSchema: Schema = new Schema({
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  measurement: {type: Number, required: true},
  time: {type: Date, default: Date.now },
  type: {type: String, required: true},
});

export const Measurement: Model<IMeasurement> = model<IMeasurement>("Measurement", measurementSchema);

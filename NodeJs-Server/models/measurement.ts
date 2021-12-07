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
    ref: 'Device',
    required: true
  },
  measurement: {type: Number, required: true},
  time: {type: Date, default: () => {return new Date()}, required: true },
  type: {type: String, required: true},
});

export const Measurement: Model<IMeasurement> = model<IMeasurement>("Measurement", measurementSchema);

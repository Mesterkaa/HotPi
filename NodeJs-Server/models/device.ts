import { Document, Schema, Model, model, Error } from "mongoose";


export interface IDevice extends Document {
    mac: string
    name: string
}

export const deviceSchema: Schema = new Schema({
  mac: {type: String, required: true},
  name: {type: String, default: "New"}
});

export const Device: Model<IDevice> = model<IDevice>("Device", deviceSchema);

import { Document, Schema, Model, model, Error } from "mongoose";

export interface ISetting extends Document {
    update_frequency: number
    measurement_frequency: number
}

export const settingSchema: Schema = new Schema({
    update_frequency: {type: Number, default: 5},
    measurement_frequency: {type: Number, default: 5}
});

export const Setting: Model<ISetting> = model<ISetting>("Setting", settingSchema);

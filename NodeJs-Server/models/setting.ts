import { Document, Schema, Model, model, Error } from "mongoose";

export interface ISetting extends Document {
    name: string
    value: any
}

export const settingSchema: Schema = new Schema({
    name: {type: String, required: true, unique: true},
    value: {type: Schema.Types.Mixed, required: true}
});

export const Setting: Model<ISetting> = model<ISetting>("Setting", settingSchema);

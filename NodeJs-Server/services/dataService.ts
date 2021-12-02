import { Device } from "../models/device";
import { IMeasurement, Measurement } from "../models/measurement";
import { Setting } from "../models/setting";

export class DataService {
    async getData(time: Date, type: string, devices: string | string[]): Promise<IMeasurement[]> {
        return await Measurement.find({time: { $gte: time}, type: type, device_id: { $in: devices}}).exec();
    }

    async saveData(temperature: number, air_pressure: number, humidity: number, mac: string): Promise<number> {
        let device = (await Device.find({mac: mac}).exec())[0];
        let id;
        if (device) {
            id = device._id;
        } else {
            device = await Device.create({mac: mac});
            id = device._id;
        }
        await Measurement.create(
            [
                {device_id: id, measurement: temperature, type: "temperature"},
                {device_id: id, measurement: humidity, type: "humidity"},
                {device_id: id, measurement: air_pressure, type: "air_pressure"}
            ]
            );
        return (await Setting.find({}))[0].measurement_frequency;
    }
}

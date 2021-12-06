import { Device } from "../models/device";
import { IMeasurement, Measurement } from "../models/measurement";
import { Setting } from "../models/setting";

export class DataService {
    /**
     * Get data from the database based on "Search parameters" from the database
     * @returns Array containing measurement data
     */
    async getData(): Promise<IMeasurement[]> {
        const settings = await Setting.find({name: {$in: ["time", "type", "devices"]}});
        let time, type, devices;
        settings.forEach(setting => {
            switch (setting.name) {
                case "time":
                    let time = new Date();
                    time.setMinutes(time.getMinutes() - setting.value);
                    break;
                case "type":
                    type = setting.value;
                    break;
                case "devices":
                    devices = setting.value;
            }
        })
        return await Measurement.find({time: { $gte: time}, type: type, device_id: { $in: devices}}).exec();
    }

    /**
     * Saves threee new documents based on the three measurements.
     * @param temperature 
     * @param air_pressure 
     * @param humidity 
     * @param mac 
     * @returns Returns the new wait time, the device should wait before taking a new measurement.
     */
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
        return (await Setting.find({name: "measurement_frequency"}))[0].value;
    }
}

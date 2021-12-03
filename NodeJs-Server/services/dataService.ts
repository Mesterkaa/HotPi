import { Device } from "../models/device";
import { IMeasurement, Measurement } from "../models/measurement";
import { Setting } from "../models/setting";

export class DataService {
    /**
     * Get data from the database based on "Search parameters"
     * @param time Date and time a measurement can't be older than
     * @param type Which type pf measurement to find.
     * @param devices Array of devices the measurement can be made by.
     * @returns Array containing measurement data
     */
    async getData(time: Date, type: string, devices: string | string[]): Promise<IMeasurement[]> {
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

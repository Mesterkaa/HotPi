import { TYPE } from "../lib/measurement_types";
import { SETTING } from "../lib/settings";
import { Device } from "../models/device";
import { IMeasurement, Measurement } from "../models/measurement";
import { Setting } from "../models/setting";

export class DataService {
    /**
     * Get data from the database based on "Search parameters" from the database
     * @returns Array containing measurement data
     */
    async getData(): Promise<IMeasurement[]> {
        const settings = await Setting.find({name: {$in: [SETTING.TIME, SETTING.TYPE, SETTING.DEVICES]}});
        let time, type, devices;
        settings.forEach(setting => {
            switch (setting.name) {
                case SETTING.TIME:
                    time = new Date();
                    time.setMinutes(time.getMinutes() - setting.value);
                    break;
                case SETTING.TYPE:
                    type = setting.value;
                    break;
                case SETTING.DEVICES:
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
                {device_id: id, measurement: temperature, type: TYPE.TEMP},
                {device_id: id, measurement: humidity, type: TYPE.HUMI},
                {device_id: id, measurement: air_pressure, type: TYPE.PRES}
            ]
            );
        return (await Setting.find({name: SETTING.M_FREQ}))[0].value;
    }
}

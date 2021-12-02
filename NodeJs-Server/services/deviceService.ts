import { Device, IDevice } from "../models/device";

export class DeviceService {
    async getDevices(): Promise<IDevice[]> {
        return await Device.find({});
    }

    async updateName(_id: string, name: string): Promise<IDevice> {
        let device = await Device.findById(_id);
        if (device) {
            device.name = name;
            return await device.save();
        } else {
            throw new Error("Couldn't find a device by that _id");
        }
    }
}
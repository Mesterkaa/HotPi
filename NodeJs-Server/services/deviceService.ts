import { Device, IDevice } from "../models/device";

export class DeviceService {
    /**
     * Gets all devices stored in the database.
     * @returns An array of devices.
     */
    async getDevices(): Promise<IDevice[]> {
        return await Device.find({});
    }

    /**
     * Updates the name of a device.
     * @param _id The id of the device that needs to be updated.
     * @param name The new name to be stored.
     * @returns The newly updated device.
     */
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
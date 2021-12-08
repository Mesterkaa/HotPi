import { NextFunction, Request, Response } from "express";
import { DeviceService } from "../services/deviceService";

export class DeviceController{
    deviceService: DeviceService = new DeviceService();

    constructor() {
        this.getDevices = this.getDevices.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    /**
     * Gets all devices stored in the db.
     * @param req 
     * @param res 
     * @param next 
     */
    public async getDevices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const devices = await this.deviceService.getDevices();
            res.send(devices);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Updates a device's name.
     * @param req body = {_id, name}
     * @param res 
     * @param next 
     */
    public async updateName({body: {_id, name}}: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const device = await this.deviceService.updateName(_id, name);
            res.send(device);
        } catch (error) {
            next(error);
        }
    }
}
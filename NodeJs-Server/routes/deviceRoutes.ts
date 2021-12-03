import { Routes } from "./Routes";

import { DeviceController } from "../controllers/deviceController";

/**
 * Defining subroutes for getting and updating devices
 */
export class DeviceRoutes extends Routes{
   private deviceController: DeviceController = new DeviceController();

   constructor(){
       super();
       this.routes();
   }
   protected routes() {
        this.router.get("/get_devices", this.deviceController.getDevices);
        this.router.put("/update_name", this.deviceController.updateName);
    }
}
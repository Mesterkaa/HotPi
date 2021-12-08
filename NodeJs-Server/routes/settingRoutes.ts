import { Routes } from "./Routes";

import { SettingController } from "../controllers/settingController";

/**
 * Defining subroutes for getting and updating settings.
 */
export class SettingRoutes extends Routes{
   private settingController: SettingController = new SettingController();

   constructor(){
       super();
       this.routes();
   }
   protected routes() {
        this.router.get("/get_settings", this.settingController.getSettings);
        this.router.get("/get_setting", this.settingController.getSetting);
        this.router.put("/update_settings", this.settingController.saveSettings);
    }
}
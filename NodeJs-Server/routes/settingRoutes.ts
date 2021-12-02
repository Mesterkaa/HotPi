import { Routes } from "./Routes";

import { SettingController } from "../controllers/settingController";

export class SettingRoutes extends Routes{
   private settingController: SettingController = new SettingController();

   constructor(){
       super();
       this.routes();
   }
   protected routes() {
        this.router.get("/get_settings", this.settingController.getSettings);
        this.router.put("/update_settings", this.settingController.saveSettings);
    }
}
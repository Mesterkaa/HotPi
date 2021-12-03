import { Routes } from "./Routes";

import { DataController } from "../controllers/dataController";

/**
 * Defining subroutes for getting and saving data
 */
export class DataRoutes extends Routes{
   private dataController: DataController = new DataController();

   constructor(){
       super();
       this.routes();
   }
   protected routes() {
        this.router.get("/get_data", this.dataController.getData);
        this.router.post("/save_data", this.dataController.saveData);
    }
}
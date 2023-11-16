import { Router } from "express";
import SignupController from "../../controllers/user/signup.controller";
 
class signupRoutes {
  router = Router();
  controller = new SignupController();
 
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
   
    this.router.post("/", this.controller.create);
    
 
  }
}
 
export default new signupRoutes().router;
 
 
 
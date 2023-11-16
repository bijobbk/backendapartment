import { Router } from 'express';
 

import Userlogin from '../../controllers/user/loginuser.controller';
import ApartmentSearch from '../../controllers/user/search.controller';
import CartController from '../../controllers/user/addcart.controller';
import userAuthenticateMiddleware from '../../controllers/user/userauthenticateMiddleware';
import UserSignIn from '../../controllers/user/userSignIn.controller';
import ViewApartments from '../../controllers/user/viewapartments.controller';
import { uploadMiddleware } from '../../controllers/admin/uploadMiddleware';
 
class uploaduserRoutes {
  router = Router();
 
  userapartment=new ViewApartments();
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
   
    
    this.router.get('/',uploadMiddleware.array("image",10),this.userapartment.findAll);
  }
}
 
export default new uploaduserRoutes().router;

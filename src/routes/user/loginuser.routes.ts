import { Router } from 'express';
 
import adminAuthenticateMiddleware from '../../controllers/admin/adminauthenticateMiddleware';
import Userlogin from '../../controllers/user/loginuser.controller';
import ApartmentSearch from '../../controllers/user/search.controller';
import CartController from '../../controllers/user/addcart.controller';
import userAuthenticateMiddleware from '../../controllers/user/userauthenticateMiddleware';
import UserSignIn from '../../controllers/user/userSignIn.controller';
import ViewApartments from '../../controllers/user/viewapartments.controller';
import { uploadMiddleware } from '../../controllers/admin/uploadMiddleware';
 
class loginuserRoutes {
  router = Router();
  userloginController = new Userlogin();
  searchController = new ApartmentSearch();
  cartController = new CartController();
  userLoginController=new UserSignIn()
  userapartment=new ViewApartments();
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
   
    this.router.post('/',this.userloginController.userlogin);
    this.router.post('/login', this.userLoginController.login);
    this.router.get('/', userAuthenticateMiddleware,this.searchController.searchApartment);
    this.router.post('/',userAuthenticateMiddleware ,this.cartController.createCart);
    this.router.get('/api/profile', userAuthenticateMiddleware, this.userLoginController.getCurrentUser);
    this.router.get('/',uploadMiddleware.array("image",10),this.userapartment.findAll);
  }
}
 
export default new loginuserRoutes().router;

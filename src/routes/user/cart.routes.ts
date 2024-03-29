import express, { Router } from 'express';
import adminAuthenticateMiddleware from '../../controllers/admin/adminauthenticateMiddleware';
import CartController from '../../controllers/user/addcart.controller';
import ViewCart from '../../controllers/user/viewcart.controller';
import userAuthenticateMiddleware from '../../controllers/user/userauthenticateMiddleware';



class CartRoutes {
  router = Router();
 
  cartget = new CartController();
  cartview=new ViewCart();
 
  

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.use(express.json());
    this.router.post('/cart',userAuthenticateMiddleware,this.cartget.createCart);
    this.router.get('/cartitems',userAuthenticateMiddleware,this.cartview.findAll);
    
    

    
    
  }
}

export default new CartRoutes().router;

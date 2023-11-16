import { Router } from 'express';
import adminSignIn from '../../controllers/admin/signin.controller';
import ViewAdmins from '../../controllers/admin/viewadmin.controller';
import adminAuthenticateMiddleware  from '../../controllers/admin/adminauthenticateMiddleware';
import ApartmentController from '../../controllers/admin/apartment.controller';
import { uploadMiddleware } from '../../controllers/admin/uploadMiddleware';
import ApartmentsController from '../../controllers/admin/apartment.controller';
//import viewapartment from '../../controllers/admin/viewapartment.controller';
import ViewApartment from '../../controllers/admin/viewapartment.controller';
import ApartmentDelete from '../../controllers/admin/delete.apartment.controller';
// import AdminSignIn from '../../controllers/admin/signin.controller';
 
 class SignInRoutes {
  router = Router();
  signInController = new adminSignIn();
  viewAdminsController=new ViewAdmins();
  // viewAdminsController = new AdminSignIn();
  apartmentControllers = new ApartmentController();
  viewapartmentControllers = new  ViewApartment();
  deleteapartmentControllers = new ApartmentDelete();
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
    // Create a new Tutorial
    this.router.post('/', this.signInController.login);
     
 
    // Retrieve all usernames
     this.router.get('/usernames',adminAuthenticateMiddleware, this.viewAdminsController.findAll);

     this.router.post('/apartment',adminAuthenticateMiddleware, uploadMiddleware.array("image",10), this. apartmentControllers.create);
     this.router.get('/apartment',adminAuthenticateMiddleware, uploadMiddleware.array("image",10), this.viewapartmentControllers .findAll);
    //  this.router.delete('/:id', this.deleteapartmentControllers .delete);
     this.router.delete('/:id', adminAuthenticateMiddleware,uploadMiddleware.array("image",10), this.deleteapartmentControllers.delete);
    // Retrieve a single Tutorial with id
    // this.router.get("/:id", this.controller.findOne);
 
    // Update a Tutorial with id
    // this.router.put("/:id", this.controller.update);
 
    // Delete a Tutorial with id
    // this.router.delete("/:id", this.controller.delete);
  }
}
 export default new SignInRoutes().router;

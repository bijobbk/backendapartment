import express, { Application } from "express";
import SignInRoutes from "../routes/admin/signin.routes"
import signupRoutes from "../routes/user/signup.routes";
import loginuserRoutes from "../routes/user/loginuser.routes";
import cartRoutes from "./user/cart.routes";
import uploaduserRoutes from "../routes/user/apartment.routes";
// import userRouts from "../routes/user/user.routes"
// import loginuserRoutes from "../routes/user/loginuser.routes";
export default class Routes {
  constructor(app: Application) {
   
    app.use("/api/admin/login", SignInRoutes);
    app.use("/api/user/signup",signupRoutes); //user signup route
    app.use("/api/user/login", loginuserRoutes);//user login route
    app.use("/api/addapartment", SignInRoutes);
    app.use("/api/viewapartment",SignInRoutes );
    app.use("/api/deleteapartment",SignInRoutes);
    app.use("/api/search",loginuserRoutes);
    app.use("/api/cart",loginuserRoutes);
    app.use("/api/viewcart",cartRoutes);
    app.use("/api/userlogin",loginuserRoutes);//NK
    app.use("/api/viewapatments",uploaduserRoutes);

 app.use('/uploads', express.static('uploads'));
    // app.use("/api/user",userRouts);
// app.use("/api/user/login", loginuserRoutes);//user login route
  }
}

import { Request, Response } from "express";
import mongoose from 'mongoose';
import signupModel from "../../models/user/signup.model";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
export default class SignupController {
//   async create(req: Request, res: Response) {
//     const { username, email,password, number } = req.body;
 
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Validation error" });
//     }
 
//     // Check if email is already in use
//     const existingUser = await signup.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "Email is already in use" });
//     }
 
//     try {
//       const createuser = await signup.create({ username, email, password,number });
//       console.log(createuser);
 
//       return res.status(201).json({
//         message: "Contact created successfully",
//         signup: createuser
//       });
//     } catch (err) {
//       console.error('Error creating Contact:', err);
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   }
async create(req: Request, res: Response) {
    try {
      const { username, email,number, password } = req.body;
      let user = await signupModel.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      user = new signupModel({
        username,
        email,
        number,
        password: hashedPassword,
      });

      await user.save();

      // const payload = {
      //   user:{
      //     id: user.id,
      //   }
      // };
      // res.json(user)

      jwt.sign({ }, 'yfyfugtduyj', { expiresIn: '3000h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }
}
 

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import SignupModel from '../../models/user/signup.model';
import LoginModel from '../../models/user/login.model';
import jwt from 'jsonwebtoken';
 
 
export default class UserSignIn {
  // async login(req: Request, res: Response) {
  //   const { email, password } = req.body;
 
  //   try {
  //     if (!email || !password) {
  //       return res.status(400).json({ message: 'Email and password are required' });
  //     }
 
  //     const user = await UserModel.findOne({ email });
 
  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }
 
  //     const passwordMatch = await bcrypt.compare(password, user.password);
 
  //     if (!passwordMatch) {
  //       return res.status(401).json({ message: 'Invalid password' });
  //     }
 
  //     // Store login details in the new collection (LoginModel)
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const loginDetails = await LoginModel.create({ email, password: hashedPassword });
  //     // Generate a JWT token with user information
  //     const token = jwt.sign({ email:'email' }, '#gdey78', { expiresIn: '3000h' });
  //     res.status(201).json({ token });
 
  //     // Adjust as needed for the token creation or response
  //     res.status(200).json({ message: 'Login successful', loginDetails });
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
 
    try {
      // Find the user by username
      const user = await SignupModel.findOne({ email });
 
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
 
      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
 
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
 
      // Create a JSON Web Token (JWT) for the user
      const payload = {
 
        email : user.email,
 
      };
 
      jwt.sign(payload, '#gdey78', { expiresIn: '3000h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
 
 
 
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }
  async getCurrentUser(req: any, res: any) {
    try {
      const email = req.userData.email; // Assuming your user ID is stored in the 'id' field
      const user = await SignupModel.findOne({ email : email });
 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
 
      res.json({ message: 'User Profile', userData: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting user' });
    }
  }
}
 
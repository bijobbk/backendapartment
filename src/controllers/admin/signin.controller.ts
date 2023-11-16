import { Request, Response } from 'express';
import AdminModel from '../../models/admin/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import authenticate from './middleware';
 
export default class AdminSignIn {
  async login(req: Request, res: Response) {
    const { username, password,email } = req.body;
 
    try {
      // Check if a user with the provided username already exists in the database
      const existingUser = await AdminModel.findOne({ $or: [{ username }, { email }] });
 
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
 
      // Hash the provided password
      const hashedPassword = await bcrypt.hash(password, 10);
 
      // Create a new user in the database
      const newUser = await AdminModel.create({ username,email, password: hashedPassword });
 
      // Generate a JWT token with user information
      const token = jwt.sign({ username,email }, '#thdgdf9', { expiresIn: '3000h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error creating signin:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
 
//   async authenticate(req: Request, res: Response) {
//     const token = req.header('Authorization');
//     if (!token) {
//       return res.status(401).json({ message: 'Authorization token is missing' });
//     }
 
//     try {
//       const decoded = jwt.verify(token, 'your-secret-key') as jwt.JwtPayload;
 
//       // Now TypeScript knows that 'decoded' is of type JwtPayload
//       if (typeof decoded === 'string') {
//         return res.status(401).json({ message: 'Invalid token format' });
//       }
 
//       // You can access 'username' safely
//       const username = decoded.username;
 
//       // You can check if the user is valid based on your requirements here.
//       // For example, you can query the database to see if the user exists.
 
//       // If valid, you can return a success response
//       res.status(200).json({ message: 'Authentication successful', user: username });
//     } catch (error) {
//       res.status(401).json({ message: 'Authentication failed' });
//     }
//   }
 }
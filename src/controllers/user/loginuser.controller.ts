// import { Request, Response } from 'express';
// import userloginModel from '../../models/user/loginuser.model';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
 
// export default class Userlogin {
//   async userlogin(req: Request, res: Response) {
//     const { username, password, email } = req.body;
 
//     try {
//       // Check if a user with the provided username already exists in the database
//       const existingUser = await userloginModel.findOne({ username });
 
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already in use' });
//       }
 
//       // Generate a salt
//       const saltRounds = 10; // Number of salt rounds
//       const salt = await bcrypt.genSalt(saltRounds);
 
//       // Hash the provided password using the generated salt
//       const hashedPassword = await bcrypt.hash(password, salt);
 
//       // Create a new user in the database
//       const newUser = await userloginModel.create({ password: hashedPassword, email });
 
//       // Generate a JWT token with user information
//       const token = jwt.sign({ email:'email' ,userId:'_id'}, '#gdey78', { expiresIn: '7000h' });
//       res.status(201).json({ token });
//     } catch (error) {
//       console.error('Error creating signin:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }
import { Request, Response } from 'express';
import userloginModel from '../../models/user/loginuser.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 
export default class Userlogin {
  async userlogin(req: Request, res: Response) {
    const { username, password, email } = req.body;
 
    try {
      // Check if a user with the provided username already exists in the database
      const existingUser = await userloginModel.findOne({ username });
 
      if (existingUser) {
        return res.status(400).json({ message: 'Username already in use' });
      }
 
      // Generate a salt
      const saltRounds = 10; // Number of salt rounds
      const salt = await bcrypt.genSalt(saltRounds);
 
      // Hash the provided password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);
 
      // Create a new user in the database
      const newUser = await userloginModel.create({ username, password: hashedPassword, email });
 
      // Generate a JWT token with user information
      const token = jwt.sign({ username }, '#gdey78', { expiresIn: '9000h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error creating signin:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
 
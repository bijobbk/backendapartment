import { Request, Response } from "express";
 
import Cart, { CartDocument } from '../../models/user/cart.model';
import mongoose from "mongoose";
 
export default class CartController {
  // Create a new cart
  async createCart(req: Request, res: Response) {
    try {
      const { userId, apartments, rooms,title, roomno } = req.body;
 
      // Check if required fields are provided
      if (!userId) {
        return res.status(400).json({ error: 'userId  are required ' });
      }
      if (!(apartments?.length>0)) {
        return res.status(400).json({ error: 'hotels are required ' });
      }
    //   if (!(rooms?.length>0)) {
    //     return res.status(400).json({ error: 'rooms are required ' });
    //   }
     
      // if (!quantity) {
      //   return res.status(400).json({ error: ' quantity required' });
      // }
      // Create a new cart item using the create function
      const newCart = await Cart.create({
        userId: new mongoose.Types.ObjectId(userId),
        // productId:new mongoose.Types.ObjectId(productId),
        apartments: apartments,
        title,
        rooms:rooms,
        roomno,
      });
 
      res.status(201).json(newCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}
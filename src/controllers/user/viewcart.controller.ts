import { Request, Response } from 'express';
// import ApartmentModel from '../../models/admin/apartment.model';
import Cart from '../../models/user/cart.model';
import ApartmentModel from '../../models/admin/apartment.model';
 
export default class ViewCart {
    async findAll(req: any, res: Response) {
        const cartData = await Cart.find({}).populate(
        {
          path: 'apartments.apartmentlId',
          model: ApartmentModel,
        }
        )
        res.send(cartData);
        console.log(cartData);
      }
}
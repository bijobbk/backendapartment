import { Request, Response } from 'express';
import HotelModel from '../../models/admin/apartment.model';
 
export default class ViewApartment {
    async findAll(req: Request, res: Response) {
        const hotelData = await HotelModel.find({}).exec();
        res.send(hotelData);
        console.log(hotelData);
      }
}
 
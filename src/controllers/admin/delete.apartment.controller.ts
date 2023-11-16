
import Express from "express";
import ApartmentModel from "../../models/admin/apartment.model";
import { Request,Response } from "express";
 
export default class ApartmentDelete
    {
        async delete(req: Request, res: Response) {
            try {
              const { id } = req.params; // Get the ID from the request params
       
              const deletedHotel = await ApartmentModel.findByIdAndUpdate(id, { deleted: true }, { new: true });
       
              if (!deletedHotel) {
                return res.status(404).json({ message: 'Apartment not found' });
              }
       
              res.status(200).json({
                message: 'Hotel soft-deleted successfully',
                deletedHotel,
              });
            } catch (err) {
              res.status(500).json({
                message: 'Internal Server Error',
                error: 'error!!!'
              });
            }
          }
    }
 
import { Request, Response } from "express";
import ApartmentModel from "../../models/admin/apartment.model";
 
export default class ApartmentController {
  async create(req: Request, res: Response) {
    try {
      const { apartmentname, price, location, kids, bedrooms, adults, checkIn, checkOut } = req.body;
      const files = req.files as Express.Multer.File[];
 
      if (!apartmentname || !location || !price || !files || files.length === 0 || !checkIn || !checkOut) {
        return res.status(400).json({ message: "Validation error: Missing required fields or image or check-in/check-out dates" });
      }
 
      const image = files.map((file: Express.Multer.File) => file.filename);
 
      const createApartment = await ApartmentModel.create({
        apartmentname,
        image,
        price,
        location,
        kids,
        bedrooms,
        adults,
        checkIn,
        checkOut,
      });
 
      res.status(201).json({
        message: "Apartment Details Entered Successfully",
        apartment: createApartment,
      });
    } catch (err) {
      console.error('Error creating Hotel:', err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
// import { Request, Response } from 'express';
// import HotelModel, { ApartmentDoc } from '../../models/admin/apartment.model';
// import { FilterQuery } from 'mongoose';
 
// export default class ApartmentSearch {
//   async searchApartment(req: Request, res: Response) {
//     const { location, checkIn, checkOut, adults, kids } = req.query as { location: string; checkIn: string; checkOut: string; adults: string; kids: string };
 
//     try {
//       const searchCriteria: FilterQuery<ApartmentDoc> = {};
 
//       if (location) {
//         searchCriteria.location = { $regex: location, $options: 'i' };
//       }
 
//       if (checkIn && checkOut) {
//         searchCriteria.checkIn = {
//           $gte: new Date(checkIn),
//           $lt: new Date(checkOut),
//         };
//       }
 
//       if (adults) {
//         // Assuming 'adults' and 'kids' are optional strings from the query
//         searchCriteria.adults = parseInt(adults);
//       }
 
//       if (kids) {
//         searchCriteria.kids = parseInt(kids);
//       }
 
//       const searchResults = await ApartmentModel.find(searchCriteria).exec();
 
//       res.status(200).json({ message: 'Search successful', results: searchResults });
//     } catch (error) {
//       console.error('Error during apartment search:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }
// }
 
import { Request, Response } from 'express';
import HotelModel, { ApartmentDoc } from '../../models/admin/apartment.model';
import { FilterQuery } from 'mongoose';

export default class ApartmentSearch {
  async searchApartment(req: Request, res: Response) {
    const { location, checkIn, checkOut, adults, kids } = req.query as { location: string; checkIn: string; checkOut: string; adults: string; kids: string };

    try {
      const searchCriteria: FilterQuery<ApartmentDoc> = {};

      if (location) {
        searchCriteria.location = { $regex: location, $options: 'i' };
      }

      if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
          // Dates are valid, add them to the search criteria
          searchCriteria.checkIn = {
            $gte: checkInDate,
            $lt: checkOutDate,
          };
        }
      }

      if (adults) {
        const parsedAdults = parseInt(adults, 10);
        if (!isNaN(parsedAdults)) {
          searchCriteria.adults = parsedAdults;
        }
      }

      if (kids) {
        const parsedKids = parseInt(kids, 10);
        if (!isNaN(parsedKids)) {
          searchCriteria.kids = parsedKids;
        }
      }

      const searchResults = await HotelModel.find(searchCriteria).exec();

      res.status(200).json({ message: 'Search successful', results: searchResults });
    } catch (error) {
      console.error('Error during apartment search:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

import mongoose, { Document, Model, Schema } from 'mongoose';
 
export interface ApartmentDoc extends Document {
  apartmentname: string;
  image: string[]; // This field stores the filename of the image
  location: string;
  bedrooms: number;
  adults: number;
  kids: number;
  price: number;
  checkIn: Date; // New field for check-in date
  checkOut: Date; // New field for check-out date
  deleted: boolean;
}
 
const apartmentSchema = new Schema<ApartmentDoc>({
  apartmentname: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  kids: {
    type: Number,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date, // Added field for check-out
 
  },
 
  checkOut: {
    type: Date, // Added field for check-out
 
  },
  deleted: {
    type: Boolean,
    default: false, // Not deleted by default
  },
}, { timestamps: true });
 
const ApartmentModel: Model<ApartmentDoc> = mongoose.model('Apartment', apartmentSchema);
 
export default ApartmentModel;
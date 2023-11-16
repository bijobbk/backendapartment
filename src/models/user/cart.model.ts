import mongoose, { Document, Schema } from 'mongoose';
 
export interface CartDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  apartments: [
    {
      apartmentId: mongoose.Schema.Types.ObjectId;
      roomno: number;
    }
  ];
//   rooms: [
//     {
//       roomId: mongoose.Schema.Types.ObjectId;
//     }
//   ];
  deleted: boolean;
}
 
const cartSchema = new Schema<CartDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel', // Reference to UserModel
      required: true,
    },
    apartments: [
      {
        hotelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Apartment', // Reference to Apartment model
          required: true,
        },
        roomno: {
          type: Number,
          required: true,
        },
      },
    ],
    // rooms: [
    //   {
    //     roomId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Room', // Reference to Room model
    //       required: true,
    //     },
    //   },
    // ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
 
const Cart = mongoose.model<CartDocument>('Cart', cartSchema);
 
export default Cart;
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      
    },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);

//ref: "Products", means we store the id and this is come from 'Products' collection
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    answer:{
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    productsPerPage: {
      type: Number,
      default: 0,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);

// "users" is the name of collection
// trim: true,   it means all the white space get removed
// unique: true, it use to restrict the dublicate of users
// timestamps: true it used to get the time whenever a new user is created
// if "role" is 0 then person is 'user' 
// but if "role" is 1 then people is "admin"
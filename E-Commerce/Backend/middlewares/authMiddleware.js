import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {

    // or token is present in 'authorization' and 'authorization' is present in 'headers' 
    // this is why we used 'req.headers.authorization' to accesss token
    // we also send 'JWT_SECRET' key to make our token
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({ 
      success: false,
      message: "Get login",
    });
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    // first we check whether the person is "usre" or "admin"
    // if "role"=0 (user)
    // if "role"=1 (admin)
    if (user.role !== 1) {
      return res.status(401).send({ 
        success: false,
        message: "Only admin can access",
      });
    } else {
      next();
    }
  } catch (error) {
    
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  findAllUserController,
  findAllAdminController,
  changeRoleController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
//This method creates a new router instance. The router instance is a mini-application with its own set of routes and middleware. 
//You can define routes, middleware, and even use other routers within this instance.
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forget Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes  -- by admin
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
     // // here first we check is the user have login or not 
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ok:true})
});

//protected admin route auth
   // here first we check is the user have login or not (by "requireSignIn")
   // then we check is the person is "admin" or not ( by '"isAdmin"')
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ok:true})
});

// update profile
router.put('/profile', requireSignIn,updateProfileController);

// get all user loggedin  --by admin
router.get("/all-users", requireSignIn, isAdmin, findAllUserController);

// get all admin loggedin  --by admin
router.get("/all-admins", requireSignIn, isAdmin, findAllAdminController);

// change role of person  --by admin
router.put("/change-role/:id", requireSignIn, isAdmin, changeRoleController);
  
export default router;


import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// registeration of new user
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    // if user is alredy registered and try to register again by same email
    // fetch the details of user by entered email (check user) 
    const exisitingUser = await userModel.findOne({ email:email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    // now register user
    const hashedPassword = await hashPassword(password);
    // create new documen and save
    const user = await new userModel({
      name: name,
      email: email,
      phone: phone,
      address: address,
      password: hashedPassword,
      answer:answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: user,
    });
  } catch (error) {
  
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error: error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {

    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
        // if we dont return then our further code is get execute continously
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // compare the entered password while login
    const match = await comparePassword(password, user.password);
    if (!match) {
        // if password do not match
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
        // send details when user loggedin successfully
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    
    res.status(500).send({
      success: false,
      message: "Error in login",
      error: error,
    });
  }
};

// forgot password
export const forgotPasswordController = async (req, res)=>{
try{


    const {email, answer, newPassword} = req.body
  if (!email) {
    return res.status(400).send({ message: "Email is Required" });
  }
  if (!answer) {
    return res.status(400).send({ message: "Answer is Required" });
  }
  if (!newPassword) {
    return res.status(400).send({ message: "newPassword is Required" });
  }

  // check the user exist or not on the basis of email, answer
  const user = await userModel.findOne({ email: email, answer: answer});

  // validation
  if(!user){
    // if user doesnot exist by this email
    return res.status(404).send({
      success:false,
      message:"Wrong email or answer"
    })
  }
  // if user exist
  // we cant send the newPassword directly 
  // first we make that password hashed then send to server
  const hashed = await hashPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id, { password: hashed});
  res.status(200).send({
    success: true,
    message:"Password Reset Successfully",
  })

}catch(error){
 
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error,
})
}}

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
  
    res.send({ error });
  }
};


//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        // if we get the new name then we set this new name(i.e name: name )
        // but if we dont give new name the we set old name as it is (i.e user.name)
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
   
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// find all people who are user
export const findAllUserController = async(req,res)=>{
  try{
    const objectsWithRoleZero = await userModel.find({ role: 0 });
    res.status(200).send({
      success: true,
      message: "These are your users",
      users:objectsWithRoleZero,
    });
  }catch (error) {
   
    res.send({ error });
  }
}

// find all people who are admin
export const findAllAdminController = async(req,res)=>{
  try{
    const objectsWithRoleAdmin = await userModel.find({ role: 1 });
    res.status(200).send({
      success: true,
      message: "These are your admins",
      users:objectsWithRoleAdmin,
    });
  }catch (error) {
   
    res.send({ error });
  }
}


// change role of person
export const changeRoleController = async(req,res)=>{
  try{

    // first we get id from url
    const { id } = req.params;

    // then we find the person of this id
    const person =await userModel.findById(id)
   
    // check role of this person
    // if role if 1 (i.e admin) then we change role to 0 (i.e user)
    // if role is0(i.e user) then we change the role to 1
    if(person.role){
             await userModel.findByIdAndUpdate(
               id,
               {role:0},
               {new:true}
           );
           }else{
             await userModel.findByIdAndUpdate(
               id,
               {role:1},
               {new:true}
           );
         }
   
      res.status(200).send({
          success:true,
          message:"Role is  updated Successfully",
      });
  }catch (error) {
   
    res.send({ success:false,
      message:"something wrong",});
  }
}


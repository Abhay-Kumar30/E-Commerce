// here we make two function 
   // first function is to make or password to  hash 
   // secnd function is to conver the hash to actual password so that we can compare when someone loggedin

import bcrypt from "bcrypt";

// 1) make our password hashed
export const hashPassword = async (password) => {
  try {

    // higher the saltRounds slower will be the cpu used
    // saltRounds make the password more strong and increase length of password 
    // and if length of password more long then cpu will take more time to decode the hash value
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    alert(error);
  }
};

// 2) to compare password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
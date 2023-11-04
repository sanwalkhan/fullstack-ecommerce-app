import User from "../models/userModel.js"

export const createUserRecord = async (req, res) => {
    try {
      const {
        email,
        password,
        confirmPassword,
        firstname,
        lastname,
        isadmin,
        phone,
        profilepic,
        address,
      } = req.body;
  
      if (
        !email ||
        !password ||
        !confirmPassword ||
        !firstname ||
        !lastname ||
        !isadmin ||
        !phone ||
        !profilepic ||
        !address
      ) {
        return res.status(400).json({ message: "All Fields Are Mandatory" });
      }
  
      const newUser = new User({
        email,
        password,
        firstname,
        lastname,
        isadmin,
        phone,
        profilepic,
        address,
      });
  
      await newUser.save();
  
    //   res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "User creation failed", error: error.message });
    }
  };
    
  export async function listAllUsers(){
    return await User.find()
  }
  
  
  // export { createUserRecord };
  


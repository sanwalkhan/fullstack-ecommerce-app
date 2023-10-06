import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    console.log("OKKK");
    const {
      email,
      password,
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
      !firstname ||
      !lastname ||
      !isadmin ||
      !phone ||
      !profilepic ||
      !address
    ) {
      res.status(400).json({ message: "All Fields Are Mandatory" });
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
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Data
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get single user

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("BEFORE fUNCTION CALL")
    const user = await User.findById(id);
    // console.log("test")
    // console.log("user",user)
    // console.log("After Call")
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({ message: `Deleted ${user.firstname}` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Login User

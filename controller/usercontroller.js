  import User from "../models/userModel.js";
  import jwt from 'jsonwebtoken';
  import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import crypto from"crypto";
  import {createUserRecord , listAllUsers} from "../MicroServices/userServices.js"
import { error } from "console";



  // // register user
  export const userRegister = async (req, res) => {
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
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      const hashPassword = await bcrypt.hash(password, 12);
  
      const newUser = new User({
        email,
        password: hashPassword,
        confirmPassword: hashPassword, 
        firstname,
        lastname,
        isadmin,
        phone,
        profilepic,
        address,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

      // // Login User
  export const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { userId: user._id, email: user.email }, 
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      res.status(500).json({ message: "Login Failed", error: error.message });
    }
  };
  // forgot Password

  
  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "thissanwalkhan@gmail.com",
          pass: "qafo yyvg clys iiea"
        }
      });
  
      const cryptoo = crypto.randomBytes(6).toString('hex');
      const mailOptions = {
        from: "thissanwalkhan@gmail.com",
        to: email,
        subject: "Reset Password OTP",
        text: `Your OTP is: ${cryptoo}`
      };
  
      user.resetPasswordOTP = cryptoo;
      await user.save();
  
      transporter.sendMail(mailOptions);
      res.status(200).json({ message: "OTP Sent Successfully!" });
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// update-password

export const updatePassword = async (req, res) => {
  try {
    const {email,  resetPasswordOTP, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ resetPasswordOTP });

    if (!user) {
      return res.status(404).json({ error: 'Invalid OTP' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};








  // create User
  export const createUser = async (req, res) => {
    try {
      const newUser = await createUserRecord(req, res);
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Get All Data
  export const getAllUser = async (req, res) => {
    console.log("Getting into listAllUsers function")
    try {
      const users = await listAllUsers();
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



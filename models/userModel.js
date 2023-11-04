import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String, 
      required: true,
    },
    resetPasswordOTP: {
      type: String, 
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isadmin: {
      type: Boolean,
      required: true,
    },
    profilepic: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

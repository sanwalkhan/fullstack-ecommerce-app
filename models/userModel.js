import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String, // Changed 'number' to 'String'
      required: true,
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
        type: String,
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

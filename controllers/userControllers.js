import User from "../models/userSchema.js";
import mongoose from "mongoose";

//Getting all user info
export const getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//creating user
export const createUser = async (req, res) => {
  let { username, email, password } = req.body;
  try {
    email = email.toLowerCase();
    const existemail = await User.findOne({ email });
    if (existemail)
      return res.status(409).send({ message: "email already exists" });
    const newUser = await User.create({
      ...req.body,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Updating user
export const updateuser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateuser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updateuser)
      return res.status(404).send({ message: `This user id ${id} not found` });
    res.send({ message: `This user id ${id} updated` });
  } catch (error) {
    res.status(500).json({
      message: "Sever error",
      error: error.message,
    });
  }
};

//Deleting user
export const deleteUser = async (req, res) => {
  const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  try {

    const users=await User.find()
    console.log(users)
    const delUser = await User.findByIdAndDelete(id);
    if (!delUser)
      return res.status(404).send({ message: `This user id ${id} not found` });
    res.status(200).send({
      message: `This user id ${id} deleted`,
      user: delUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

import Auth from "../models/authSchema.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const getAuth = async (req, res) => {
  const getAll = await Auth.find();
  res.json(getAll);
};

//register
export const register = async (req, res) => {
  let { name, email, password, role } = req.body;
  try {
    email = email.toLowerCase();
    const existEmail = await Auth.findOne({ email });
    if (existEmail)
      return res
        .status(409)
        .json({ message: `This email ${existEmail.email} already exist` });
    const registerOne = await Auth.create({
      ...req.body,
    });
    const token = generateToken(registerOne._id);
    res.status(201).json({
      message: `This email ${registerOne.email}  created`,
      auth: registerOne,
      token
    });
  } catch (error) {
    res.json({
      message: "Sever error",
      error: error.message,
    });
  }
};


//Login
export const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    email = email.toLowerCase();
    const user = await Auth.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id);
    console.log("Token ", token);

    res.status(200).json({
        message:'Login succesed',
        token,
        userInfo:user
    })
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

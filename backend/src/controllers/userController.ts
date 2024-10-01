import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ userId: newUser._id });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};




export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      res.status(404).json({ message: "Cannot find user" });
    } else {
      res.json(user);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

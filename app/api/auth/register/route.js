import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import mongoose, { Mongoose, mongo } from "mongoose";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  await dbConnect();
  const hashedPass = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    email,
    password: hashedPass,
  };
  try {
    const user = await userModel.findOne({ email }).lean();
    console.log(user);
    if (user) {
      return new NextResponse("Email already registered", { status: 500 });
    } else {
      const user = await userModel.create(newUser);
      return new NextResponse("User has been created", { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(err?.message, { status: 500 });
  }
};

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export interface IGetUserAuthInfoRequest extends Request {
  user?: string | JwtPayload;
}


export interface UserData extends Document {
  name: string;
  email: string;
  password: string;
  age?: number | null;
  fitnessLevel?: string | null;
  goals?: string[] | null;
  weight?: number | null;
  height?: number | null;
  userNotes?: string[] | null;
}



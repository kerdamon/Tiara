import { IUser, User } from "@/models/user.js";
import crypto from "crypto";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { MongooseError } from "mongoose";

import { privateRsaKey } from "@/utils.js";

export async function register(req: Request, res: Response) {
  console.log(`register`);
  console.log(req.body);
  try {
    const { salt, passwordHash } = generatePasswordHash(req.body.password);
    const user = await User.create({
      email: req.body.email,
      passwordHash,
      salt,
    });
    return res.status(201).json({
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    const message =
      error instanceof MongooseError ? error.message : String(error);
    return res.status(400).json({ message });
  }
}

export async function login(req: Request, res: Response) {
  console.log(`login`);
  console.log(req.body);
  const user = await User.findOne<IUser>({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = validatePasswordHash(
    req.body.password,
    user.salt,
    user.passwordHash
  );
  if (!isValid) return res.status(401).json({ message: "Invalid password" });

  const token = signJWT(user);

  return res.status(200).json({ data: token });
}

function signJWT(user: IUser) {
  const payload = {
    id: user._id,
    at: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, privateRsaKey, {
    expiresIn: "1d",
    algorithm: "RS256",
  });

  return signedToken;
}

function generatePasswordHash(password: string) {
  var salt = crypto.randomBytes(32).toString("hex");
  var passwordHash = hashPassword(password, salt);

  return {
    salt,
    passwordHash,
  };
}

function validatePasswordHash(password: string, salt: string, hash: string) {
  return hashPassword(password, salt) === hash;
}

function hashPassword(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
}

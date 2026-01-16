import dotenv from 'dotenv';
import e from 'express';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URL = process.env.MONGODB_URL;
export const JWTSECRET = process.env.JWTSECRET;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
export const AI_API_KEY = process.env.AI_API_KEY;
export const CLINT = process.env.CLINT;
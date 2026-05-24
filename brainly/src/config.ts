import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is missing`);
  }
  return value;
}

export const JWT_PASSWORD = getEnv("JWT_PASSWORD");
export const MONGO_URL = getEnv("MONGO_URL");
export const PORT= getEnv("PORT")
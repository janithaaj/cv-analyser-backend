import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

const JWT_SECRET = env.JWT_SECRET;
const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;

export interface TokenPayload {
  userId: string;
  email: string;
}

export const generateTokens = (userId: string, email: string) => {
  const accessToken = jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as SignOptions
  );
  
  const refreshToken = jwt.sign(
    { userId, email },
    JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as SignOptions
  );
  
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, secret: string): TokenPayload => {
  return jwt.verify(token, secret) as TokenPayload;
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return verifyToken(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return verifyToken(token, JWT_REFRESH_SECRET);
};


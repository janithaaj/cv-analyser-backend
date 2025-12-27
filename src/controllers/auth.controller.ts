import { Response } from 'express';
import { AuthRequest } from '../types';
import { AuthService } from '../services/auth.service';
import { formatResponse, formatError } from '../utils/helpers';
import { verifyRefreshToken, generateTokens } from '../utils/jwt';

const authService = new AuthService();

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { user, tokens } = await authService.register(req.body);
    res.status(201).json(formatResponse({ user, ...tokens }, 'User registered successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json(formatError('Email and password are required'));
    }
    
    const { user, tokens } = await authService.login(email, password);
    res.json(formatResponse({ user, ...tokens }, 'Login successful'));
  } catch (error: any) {
    // Don't expose whether user exists or not (security best practice)
    const message = error.statusCode === 401 
      ? 'Invalid email or password' 
      : error.message;
    res.status(error.statusCode || 500).json(formatError(message));
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }
    const user = await authService.getUserById(req.user.userId);
    if (!user) {
      return res.status(404).json(formatError('User not found'));
    }
    res.json(formatResponse(user));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const refreshToken = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      return res.status(400).json(formatError('Refresh token is required'));
    }
    
    // Verify refresh token and generate new access token
    // This is a simplified version - you may want to store refresh tokens in DB
    const decoded = verifyRefreshToken(token);
    const tokens = generateTokens(decoded.userId, decoded.email);
    
    res.json(formatResponse(tokens, 'Token refreshed successfully'));
  } catch (error: any) {
    res.status(401).json(formatError('Invalid refresh token'));
  }
};


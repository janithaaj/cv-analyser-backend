import bcrypt from 'bcrypt';
import User, { IUser } from '../models/User.model';
import { generateTokens } from '../utils/jwt';
import { ValidationError, NotFoundError, UnauthorizedError } from '../utils/errors';

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: 'HR' | 'ADMIN' | 'MANAGER';
  }): Promise<{ user: IUser; tokens: { accessToken: string; refreshToken: string } }> {
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      throw new ValidationError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({
      ...data,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role || 'HR'
    });

    await user.save();

    const tokens = generateTokens(user._id.toString(), user.email);

    const userObj = user.toObject();
    delete (userObj as any).password;

    return {
      user: userObj as IUser,
      tokens
    };
  }

  async login(email: string, password: string): Promise<{
    user: IUser;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const tokens = generateTokens(user._id.toString(), user.email);

    const userObj = user.toObject();
    delete (userObj as any).password;

    return {
      user: userObj as IUser,
      tokens
    };
  }

  async getUserById(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId).select('-password');
    return user;
  }
}


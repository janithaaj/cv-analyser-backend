"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
class AuthService {
    async register(data) {
        const existingUser = await User_model_1.default.findOne({ email: data.email.toLowerCase() });
        if (existingUser) {
            throw new errors_1.ValidationError('User with this email already exists');
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = new User_model_1.default({
            ...data,
            email: data.email.toLowerCase(),
            password: hashedPassword,
            role: data.role || 'HR'
        });
        await user.save();
        const tokens = (0, jwt_1.generateTokens)(user._id.toString(), user.email);
        const userObj = user.toObject();
        delete userObj.password;
        return {
            user: userObj,
            tokens
        };
    }
    async login(email, password) {
        const user = await User_model_1.default.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const tokens = (0, jwt_1.generateTokens)(user._id.toString(), user.email);
        const userObj = user.toObject();
        delete userObj.password;
        return {
            user: userObj,
            tokens
        };
    }
    async getUserById(userId) {
        const user = await User_model_1.default.findById(userId).select('-password');
        return user;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
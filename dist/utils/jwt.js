"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.verifyToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const JWT_SECRET = env_1.env.JWT_SECRET;
const JWT_REFRESH_SECRET = env_1.env.JWT_REFRESH_SECRET;
const generateTokens = (userId, email) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId, email }, JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRES_IN });
    const refreshToken = jsonwebtoken_1.default.sign({ userId, email }, JWT_REFRESH_SECRET, { expiresIn: env_1.env.JWT_REFRESH_EXPIRES_IN });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
const verifyAccessToken = (token) => {
    return (0, exports.verifyToken)(token, JWT_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return (0, exports.verifyToken)(token, JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map
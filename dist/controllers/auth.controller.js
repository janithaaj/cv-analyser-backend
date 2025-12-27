"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.getMe = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth.service");
const helpers_1 = require("../utils/helpers");
const jwt_1 = require("../utils/jwt");
const authService = new auth_service_1.AuthService();
const register = async (req, res) => {
    try {
        const { user, tokens } = await authService.register(req.body);
        res.status(201).json((0, helpers_1.formatResponse)({ user, ...tokens }, 'User registered successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json((0, helpers_1.formatError)('Email and password are required'));
        }
        const { user, tokens } = await authService.login(email, password);
        res.json((0, helpers_1.formatResponse)({ user, ...tokens }, 'Login successful'));
    }
    catch (error) {
        // Don't expose whether user exists or not (security best practice)
        const message = error.statusCode === 401
            ? 'Invalid email or password'
            : error.message;
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(message));
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json((0, helpers_1.formatError)('Unauthorized'));
        }
        const user = await authService.getUserById(req.user.userId);
        if (!user) {
            return res.status(404).json((0, helpers_1.formatError)('User not found'));
        }
        res.json((0, helpers_1.formatResponse)(user));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getMe = getMe;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken: token } = req.body;
        if (!token) {
            return res.status(400).json((0, helpers_1.formatError)('Refresh token is required'));
        }
        // Verify refresh token and generate new access token
        // This is a simplified version - you may want to store refresh tokens in DB
        const decoded = (0, jwt_1.verifyRefreshToken)(token);
        const tokens = (0, jwt_1.generateTokens)(decoded.userId, decoded.email);
        res.json((0, helpers_1.formatResponse)(tokens, 'Token refreshed successfully'));
    }
    catch (error) {
        res.status(401).json((0, helpers_1.formatError)('Invalid refresh token'));
    }
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.controller.js.map
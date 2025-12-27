"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDB = async () => {
    try {
        if (!env_1.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        console.log(`Connecting to MongoDB: ${env_1.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
        const conn = await mongoose_1.default.connect(env_1.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // Handle connection events
        mongoose_1.default.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=database.js.map
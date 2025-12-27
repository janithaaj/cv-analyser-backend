"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.AppError) {
        logger_1.default.error(`AppError: ${err.message}`, {
            statusCode: err.statusCode,
            stack: err.stack
        });
        return res.status(err.statusCode).json({
            success: false,
            error: err.message
        });
    }
    logger_1.default.error(`Unexpected error: ${err.message}`, {
        stack: err.stack
    });
    return res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map
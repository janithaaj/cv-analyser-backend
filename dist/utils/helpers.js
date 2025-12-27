"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = exports.formatError = exports.formatResponse = exports.paginate = void 0;
const paginate = (page, limit) => {
    const skip = (page - 1) * limit;
    return { skip, limit };
};
exports.paginate = paginate;
const formatResponse = (data, message) => {
    return {
        success: true,
        message,
        data
    };
};
exports.formatResponse = formatResponse;
const formatError = (message, errors) => {
    return {
        success: false,
        message,
        errors
    };
};
exports.formatError = formatError;
const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};
exports.isValidObjectId = isValidObjectId;
//# sourceMappingURL=helpers.js.map
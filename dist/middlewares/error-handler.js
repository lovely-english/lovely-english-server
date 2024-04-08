"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("src/config/logger"));
const custom_error_1 = require("src/models/custom-error");
const errorHandler = (err, _req, res, _next) => {
    var _a, _b;
    let customError = new custom_error_1.CustomError(500, 'Something went wrong.', {
        errorInfo: err.message,
        stack: 'stack' in err ? err.stack : '',
        label: 'label' in err ? err === null || err === void 0 ? void 0 : err.label : '',
    });
    if (err instanceof custom_error_1.CustomError) {
        customError = err;
    }
    logger_1.default.log(Object.assign({ level: customError.status === 404 || customError.status === 400 ? 'warn' : 'error', message: err.message || customError.message, label: (_a = customError === null || customError === void 0 ? void 0 : customError.data) === null || _a === void 0 ? void 0 : _a.label }, customError === null || customError === void 0 ? void 0 : customError.data));
    (_b = customError === null || customError === void 0 ? void 0 : customError.data) === null || _b === void 0 ? true : delete _b.label;
    res.status(customError.status).json({
        message: customError.message,
        data: customError.data,
        error: true,
    });
};
exports.default = errorHandler;

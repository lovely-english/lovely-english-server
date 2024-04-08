"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
class CustomError extends Error {
    constructor(status = 500, message, data = undefined) {
        super();
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.CustomError = CustomError;

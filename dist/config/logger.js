"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, printf } = winston_1.default.format;
const formatter = printf((_a) => {
    var { level, message, label, timestamp } = _a, rest = __rest(_a, ["level", "message", "label", "timestamp"]);
    return `${timestamp} ${level}: ${label ? `[${label}] ` : ''}${message} ${Object.keys(rest).length ? JSON.stringify(rest, undefined, 2) : ''}`;
});
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 5,
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'white',
};
winston_1.default.addColors(colors);
const logger = winston_1.default.createLogger({
    levels,
    format: winston_1.default.format.json(),
    transports: [
        new winston_1.default.transports.Console({
            level: 'debug',
            format: combine(winston_1.default.format.colorize(), timestamp(), formatter),
        }),
    ],
});
exports.default = logger;

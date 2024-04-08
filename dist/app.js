"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.get('/', (_req, res) => {
    var _a;
    res.status(200).send({
        message: `Server is up ✅ - Environment: ${(_a = process.env.ENV) !== null && _a !== void 0 ? _a : 'test'}`,
        data: undefined,
        error: false,
    });
});
exports.default = app;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = __importStar(require("mongoose"));
const Sentry = __importStar(require("@sentry/node"));
const profiling_node_1 = require("@sentry/profiling-node");
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./config/logger"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const port = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGO_URL || '';
if (process.env.ENV && process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENV,
        release: `lovely-english-server@${(_a = process.env.PACKAGE_VERSION) === null || _a === void 0 ? void 0 : _a.replace(/"/g, '')}`,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Sentry.Integrations.Express({ app: app_1.default }),
            (0, profiling_node_1.nodeProfilingIntegration)(),
        ],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
    });
    app_1.default.use(Sentry.Handlers.requestHandler());
    app_1.default.use(Sentry.Handlers.tracingHandler());
    app_1.default.use(Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            var _a;
            return (!(error === null || error === void 0 ? void 0 : error.status) ||
                !(error.status === 400 || error.status === 404) ||
                ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.label) === 'public-postulant-course');
        },
    }));
}
app_1.default.use(error_handler_1.default);
mongoose
    .connect(MONGODB_URL)
    .then(() => {
    logger_1.default.log({ level: 'info', message: '✅ Database connected', label: 'mongo' });
    app_1.default.listen(port, () => {
        logger_1.default.log({
            level: 'info',
            message: `Lovely English server listening on port ${port}`,
            label: 'server',
        });
    });
})
    .catch((error) => {
    logger_1.default.log({
        level: 'error',
        message: '🔴 Database error: ',
        errorData: error,
        label: 'mongo',
    });
    app_1.default.listen(port, () => {
        logger_1.default.log({
            level: 'info',
            message: `Lovely English server listening on port ${port}`,
            label: 'server',
        });
    });
});

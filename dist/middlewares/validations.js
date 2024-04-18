"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValidation = exports.phoneValidation = exports.emailValidation = exports.commentValidation = exports.descriptionValidation = exports.dniValidation = exports.commentStringValidation = exports.longStringValidation = exports.mediumStringValidation = exports.nameValidation = exports.shortStringValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const regex_1 = require("src/constants/regex");
const validation_messages_1 = require("src/constants/validation-messages");
const custom_error_1 = require("src/models/custom-error");
const validateMongoId = (req, _res, next) => {
    const entries = Object.entries(req.params);
    const idParams = entries.reduce((prev, [key, value]) => {
        if (key.toLowerCase().includes('id')) {
            prev.push([key, mongoose_1.default.Types.ObjectId.isValid(value)]);
        }
        return prev;
    }, []);
    if (!idParams.length) {
        throw new custom_error_1.CustomError(400, 'Missing mongo id parameter.');
    }
    const invalidId = idParams.find((param) => param[1] === false);
    if (invalidId) {
        throw new custom_error_1.CustomError(400, `Mongo id: ${invalidId[0]}  is not valid.`);
    }
    return next();
};
const validateFirebaseUid = (req, _res, next) => {
    if (!req.params.uid) {
        throw new custom_error_1.CustomError(400, 'Missing firebase uid parameter.');
    }
    const uid = joi_1.default.string().min(28).max(36).messages({
        'string.min': 'The firebase uid is not valid 28 characters min.',
        'string.max': 'The firebase uid is not valid 36 characters max.',
    });
    const validation = uid.validate(req.params.uid);
    if (validation.error) {
        throw new custom_error_1.CustomError(400, validation.error.details[0].message);
    }
    return next();
};
const validateDni = (req, _res, next) => {
    if (!req.params.dni) {
        throw new custom_error_1.CustomError(400, 'Missing dni parameter');
    }
    const dniValid = joi_1.default.string()
        .min(6)
        .max(9)
        .pattern(/^[0-9]+$/);
    const validation = dniValid.validate(req.params.dni);
    if (validation.error) {
        throw new custom_error_1.CustomError(400, `The dni: ${req.params.dni} is not valid`);
    }
    return next();
};
const validateComment = (req, _res, next) => {
    if (!req.body.description) {
        throw new custom_error_1.CustomError(400, 'Missing description');
    }
    const longStringRegex = /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/¿?-]+$/;
    const commentValid = joi_1.default.string().pattern(longStringRegex).required().min(3).max(5000).empty();
    const validation = commentValid.validate(req.body.description);
    if (validation.error) {
        throw new custom_error_1.CustomError(400, 'The comment is not valid');
    }
    return next();
};
const shortStringValidation = (regex = regex_1.shortStringRegex) => joi_1.default.string().pattern(regex).required().max(200).empty();
exports.shortStringValidation = shortStringValidation;
const nameValidation = () => (0, exports.shortStringValidation)().messages(validation_messages_1.nameMessages);
exports.nameValidation = nameValidation;
const mediumStringValidation = (regex = regex_1.longStringRegex) => joi_1.default.string().pattern(regex).required().max(200).empty();
exports.mediumStringValidation = mediumStringValidation;
const longStringValidation = (regex = regex_1.longStringRegex) => joi_1.default.string().pattern(regex).required().min(3).max(5000).empty();
exports.longStringValidation = longStringValidation;
const commentStringValidation = (regex = regex_1.longStringRegex) => joi_1.default.string().pattern(regex).required().min(3).max(5000).empty();
exports.commentStringValidation = commentStringValidation;
exports.dniValidation = joi_1.default.string()
    .pattern(/^[0-9]+$/)
    .min(6)
    .max(8)
    .required()
    .messages(validation_messages_1.dniMessages);
exports.descriptionValidation = (0, exports.longStringValidation)().messages(validation_messages_1.descriptionMessages);
exports.commentValidation = (0, exports.commentStringValidation)().messages(validation_messages_1.commentMessages);
exports.emailValidation = joi_1.default.string()
    .required()
    .pattern(regex_1.emailRegex)
    .max(256)
    .messages(validation_messages_1.emailMessages);
exports.phoneValidation = joi_1.default.string()
    .pattern(/^[0-9]+$/)
    .min(8)
    .max(11)
    .required()
    .messages(validation_messages_1.phoneMessages);
exports.roleValidation = joi_1.default.string().valid('ADMIN', 'TUTOR', 'STUDENT').required().messages({
    'any.required': 'The role must be one of the assigned.',
    'string.valid': 'Role must be valid.',
});
exports.default = {
    validateMongoId,
    validateFirebaseUid,
    validateDni,
    validateComment,
};

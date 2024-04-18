"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdRegex = exports.emailRegex = exports.longStringRegex = exports.containSpecialCharactersRegex = exports.shortStringRegex = exports.namingRegex = void 0;
exports.namingRegex = /^[\p{L}\p{M}]+([ \p{L}\p{M}])*$/u;
exports.shortStringRegex = /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()-]+$/;
exports.containSpecialCharactersRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s() -`!@#$%^&*()_+=[\]{};':"\\|,<>/?~]+$/;
exports.longStringRegex = /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/¿?-]+$/;
exports.emailRegex = /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-z-]+)*(\.[a-z]{2,4})$/;
exports.mongoIdRegex = /^[0-9a-gA-G]{24}$/;

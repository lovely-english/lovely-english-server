import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';

import { emailRegex, longStringRegex, shortStringRegex } from 'src/constants/regex';
import {
  commentMessages,
  descriptionMessages,
  dniMessages,
  emailMessages,
  nameMessages,
  phoneMessages,
} from 'src/constants/validation-messages';
import { CustomError } from 'src/models/custom-error';

const validateMongoId = (req: Request, _res: Response, next: NextFunction) => {
  const entries = Object.entries(req.params);
  const idParams = entries.reduce<[string, boolean][]>((prev, [key, value]) => {
    if (key.toLowerCase().includes('id')) {
      prev.push([key, mongoose.Types.ObjectId.isValid(value)]);
    }
    return prev;
  }, []);
  if (!idParams.length) {
    throw new CustomError(400, 'Missing mongo id parameter.');
  }
  const invalidId = idParams.find((param) => param[1] === false);
  if (invalidId) {
    throw new CustomError(400, `Mongo id: ${invalidId[0]}  is not valid.`);
  }
  return next();
};

const validateFirebaseUid = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.params.uid) {
    throw new CustomError(400, 'Missing firebase uid parameter.');
  }

  const uid = Joi.string().min(28).max(36).messages({
    'string.min': 'The firebase uid is not valid 28 characters min.',
    'string.max': 'The firebase uid is not valid 36 characters max.',
  });

  const validation = uid.validate(req.params.uid);
  if (validation.error) {
    throw new CustomError(400, validation.error.details[0].message);
  }
  return next();
};

const validateDni = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.params.dni) {
    throw new CustomError(400, 'Missing dni parameter');
  }
  const dniValid = Joi.string()
    .min(6)
    .max(9)
    .pattern(/^[0-9]+$/);
  const validation = dniValid.validate(req.params.dni);

  if (validation.error) {
    throw new CustomError(400, `The dni: ${req.params.dni} is not valid`);
  }
  return next();
};

const validateComment = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body.description) {
    throw new CustomError(400, 'Missing description');
  }

  const longStringRegex =
    /^(?!\s)(?![\s\S]*\s$)[A-Za-zÀ-ÖØ-öø-ÿ0-9\s()!@#$%^&*()_+={};':",.<>/¿?-]+$/;

  const commentValid = Joi.string().pattern(longStringRegex).required().min(3).max(5000).empty();
  const validation = commentValid.validate(req.body.description);

  if (validation.error) {
    throw new CustomError(400, 'The comment is not valid');
  }
  return next();
};

export const shortStringValidation = (regex = shortStringRegex) =>
  Joi.string().pattern(regex).required().max(200).empty();

export const nameValidation = () => shortStringValidation().messages(nameMessages);

export const mediumStringValidation = (regex = longStringRegex) =>
  Joi.string().pattern(regex).required().max(200).empty();

export const longStringValidation = (regex = longStringRegex) =>
  Joi.string().pattern(regex).required().min(3).max(5000).empty();

export const commentStringValidation = (regex = longStringRegex) =>
  Joi.string().pattern(regex).required().min(3).max(5000).empty();

export const dniValidation = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(6)
  .max(8)
  .required()
  .messages(dniMessages);

export const descriptionValidation = longStringValidation().messages(descriptionMessages);
export const commentValidation = commentStringValidation().messages(commentMessages);

export const emailValidation = Joi.string()
  .required()
  .pattern(emailRegex)
  .max(256)
  .messages(emailMessages);

export const phoneValidation = Joi.string()
  .pattern(/^[0-9]+$/)
  .min(8)
  .max(11)
  .required()
  .messages(phoneMessages);

export const roleValidation = Joi.string().valid('ADMIN', 'TUTOR', 'STUDENT').required().messages({
  'any.required': 'The role must be one of the assigned.',
  'string.valid': 'Role must be valid.',
});

export default {
  validateMongoId,
  validateFirebaseUid,
  validateDni,
  validateComment,
};

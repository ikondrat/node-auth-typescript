import Joi, { ValidationResult } from '@hapi/joi';
import { User } from './model/User';

export const validateRegistration = (
  registrationDate: User
): ValidationResult =>
  Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).validate(registrationDate);

export const validateLogin = (loginData: User): ValidationResult =>
  Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).validate(loginData);

import Joi, { ValidationResult } from '@hapi/joi';
import { User } from './model/User';

export const validateRegistration = (
  registrationDate: Pick<User, 'name' | 'email' | 
  'password'>
): ValidationResult =>
  Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).validate(registrationDate);

export const validateLogin = (
  loginData: Pick<User, 'email' | 'password'>
): ValidationResult =>
  Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).validate(loginData);

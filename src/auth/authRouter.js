import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../../config/validateMiddleware.js';
import * as authController from './authController.js'
import { isAuth } from '../../config/authMiddleware.js';

const authRouter = express.Router();

const validateCredential = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  validate,
];

authRouter.post('/signup', validateSignup, authController.signup);

authRouter.post('/login', validateCredential, authController.login);

authRouter.get('/me', isAuth, authController.me);

export default authRouter;

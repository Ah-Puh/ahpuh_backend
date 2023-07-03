import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from './authDao.js';
import pool from '../../config/database.js';

// TODO: Make it secure!
const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { email, password, name, phone } = req.body;
  const connection = await pool.getConnection(async conn => conn);
  const user = await userRepository.findByEmail(connection, email);
  
  if (user) {
    return res.status(409).json({ message: `${email} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser(connection, {
    email,
    password: hashed,
    name,
    phone,
  });
  const token = createJwtToken(userId);
  connection.release();
  res.status(201).json({ token, email });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const connection = await pool.getConnection(async conn => conn);
  const user = await userRepository.findByEmail(connection, email);

  if (!user.email) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  const token = createJwtToken(email);
  connection.release();
  res.status(200).json({ token, email });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
 
export async function me(req, res, next) {
  const user = await userRepository.findByEmail(req.body.email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, email: user.email });
}

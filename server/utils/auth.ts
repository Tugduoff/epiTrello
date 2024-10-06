import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { wrapFunction } from './wrapFunction';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Types for JWT payload
interface JwtPayload {
  id: number;
  email: string;
}

/**
 * Hashes a password using bcrypt.
 * 
 * @param password - The password to hash.
 * @returns The hashed password.
 * 
 * @throws Error if hashing fails.
 * 
 * @example
 * const hashedPassword = await hashPassword('password');
 */
export const hashPassword = wrapFunction(async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
});

/**
 * Verifies a password against a given bcrypt hash.
 * 
 * @param password - The plain text password.
 * @param hash - The hashed password to compare against.
 * @returns A boolean indicating whether the password is valid.
 * 
 * @throws Error if the comparison fails.
 * 
 * @example
 * const isValid = await verifyPassword('password', hashedPassword);
 */
export const verifyPassword = wrapFunction(async (password: string, hash: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
});

/**
 * Generates a JSON Web Token (JWT) for a user.
 * 
 * @param user - The user's details to include in the token payload.
 * @returns A signed JWT token as a string.
 * 
 * @throws Error if token generation fails.
 * 
 * @example
 * const token = await generateToken({ id: user.id, email: user.email });
 */
export const generateToken = wrapFunction(async (user: JwtPayload): Promise<string> => {
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
  return token;
});

/**
 * Verifies a JSON Web Token (JWT) and decodes the payload.
 * 
 * @param token - The JWT token to verify and decode.
 * @returns The decoded JWT payload containing user details.
 * 
 * @throws Error if token verification fails.
 * 
 * @example
 * const decodedPayload = await verifyToken(token);
 */
export const verifyToken = wrapFunction(async (token: string): Promise<JwtPayload> => {
  const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
  return decodedToken;
});

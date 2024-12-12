import bcrypt from "bcrypt";

/**
 * Hashes a plain-text password.
 * @param password - The plain-text password to hash.
 * @param saltRounds - The number of salt rounds for bcrypt (default: 10).
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string, saltRounds = 10): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

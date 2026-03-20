import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async (password: string): Promise<string> => {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
    return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
    password: string,
    hash: string,
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

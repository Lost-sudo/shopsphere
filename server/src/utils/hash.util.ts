import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};

export const comparePassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

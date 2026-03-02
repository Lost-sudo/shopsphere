import prisma from "../config/db";
import { UserRepositoryImp } from "../interfaces/user.interface";
import { User } from "../types/auth.types";
import { UserRegisterInput } from "../schemas/auth.schema";

export class UserRepository implements UserRepositoryImp {
    async getAllUser(): Promise<User[]> {
        return prisma.user.findMany();
    }
    async getUserById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
    async getUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    async createUser(user: UserRegisterInput): Promise<User> {
        return prisma.user.create({
            data: {
                ...user,
            },
        });
    }
    async updateUser(id: string, user: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: {
                id,
            },
            data: {
                ...user,
            },
        });
    }
    async deleteUser(id: string): Promise<User> {
        return prisma.user.delete({
            where: {
                id,
            },
        });
    }
}

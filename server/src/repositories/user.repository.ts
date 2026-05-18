import prisma from "../config/db";
import { IUserRepository } from "../interfaces/user.interface";
import { User } from "../types/auth.types";
import { UserRegisterInput } from "../schemas/auth.schema";

export class UserRepository implements IUserRepository {
    async getAllUser(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async getUserStats(): Promise<{
        totalCustomers: number;
        newCustomersThisMonth: number;
        previousMonthCustomers: number;
    }> {
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const [totalCustomers, newThisMonth, newLastMonth] = await Promise.all([
            prisma.user.count({ where: { role: "CUSTOMER" } }),
            prisma.user.count({
                where: {
                    role: "CUSTOMER",
                    createdAt: { gte: startOfThisMonth },
                },
            }),
            prisma.user.count({
                where: {
                    role: "CUSTOMER",
                    createdAt: {
                        gte: startOfLastMonth,
                        lt: startOfThisMonth,
                    },
                },
            }),
        ]);

        return {
            totalCustomers,
            newCustomersThisMonth: newThisMonth,
            previousMonthCustomers: newLastMonth,
        };
    }
    async getUserGrowthByMonth(months: number): Promise<{ month: string; count: number }[]> {
        const now = new Date();
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const startDate = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

        const users = await prisma.user.findMany({
            where: { createdAt: { gte: startDate } },
            select: { createdAt: true },
        });

        const monthlyMap = new Map<string, number>();
        for (let i = months - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            monthlyMap.set(key, 0);
        }
        for (const u of users) {
            const d = new Date(u.createdAt);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            if (monthlyMap.has(key)) {
                monthlyMap.set(key, monthlyMap.get(key)! + 1);
            }
        }

        return Array.from(monthlyMap.entries()).map(([month, count]) => ({ month, count }));
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

export const userRepository = new UserRepository();

import { UserServiceImp } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { UpdateUserName, UpdateUserEmail, UpdateUserPassword } from "../schemas/user.schema";
import { SafeUser, User } from '../types/auth.types';
import { NotFoundError } from '../utils/errors/notFoundError';

export class UserSerive implements UserServiceImp {
    constructor(
        private userRepository: UserRepository
    ) { }
    private async safeUser(data: User) {
        const { password, ...safeUser } = data;

        return safeUser;
    }
    async getAllUser(): Promise<User[]> {
        return this.userRepository.getAllUser();
    }
    async getProfile(id: string): Promise<SafeUser> {
        const existingUser = await this.userRepository.getUserById(id);

        if (!existingUser) {
            throw new NotFoundError("User with the given ID does not exist.")
        }

        const user = this.safeUser(existingUser);

        return user;
    }
    async getProfileById(id: string): Promise<SafeUser> {
        const existingUser = await this.userRepository.getUserById(id);

        if (!existingUser) {
            throw new NotFoundError("User with the given ID does not exist.")
        }

        const user = this.safeUser(existingUser);

        return user;
    }
    async updateUserName(id: string, data: UpdateUserName): Promise<SafeUser> {
        const existingUser = await this.userRepository.getUserById(id);

        if (!existingUser) {
            throw new NotFoundError("User with the given ID does not exist.")
        }

        const updatedUserName: Partial<User> = {
            ...existingUser,
            name: data.name
        };

        const updatedUser = await this.safeUser(await this.userRepository.updateUser(id, updatedUserName));

        return updatedUser;
    }
    async updateUserEmail(id: string, data: UpdateUserEmail): Promise<SafeUser> {
        const existingUser = await this.userRepository.getUserById(id);

        if (!existingUser) {
            throw new NotFoundError("User with the given ID does not exist.")
        }

        // TODO: Implement a email verification (Send a code to the user email both the old and new email)

        const updatedUserEmail: Partial<User> = {
            ...existingUser,
            email: data.email
        };

        const updatedUser = await this.safeUser(await this.userRepository.updateUser(id, updatedUserEmail));

        return updatedUser;
    }
    async updateUserPassword(id: string, data: UpdateUserPassword): Promise<boolean> {
        const existingUser = await this.userRepository.getUserById(id);

        if (!existingUser) {
            throw new NotFoundError("User with the given ID does not exist.")
        }

        // TODO: Implement a verification service before processing the password update.

        const updatedUserPassword: Partial<User> = {
            ...existingUser,
            password: data.password
        }

        const updatedPassword = await this.safeUser(await this.userRepository.updateUser(id, updatedUserPassword));
        if (!updatedPassword) return false;
        return true;
    }
    async deleteUser(id: string): Promise<boolean> {
        const existingUser = await this.userRepository.deleteUser(id);

        if (!existingUser) {
            throw new NotFoundError("User with the given ID does not exist.")
        }

        await this.userRepository.deleteUser(id);

        return true;
    }
}
import { IUserService, IUserRepository } from "../interfaces/user.interface";
import { UpdateUserName, UpdateUserEmail, UpdateUserPassword } from "../schemas/user.schema";
import { SafeUser, User } from '../types/auth.types';
import { NotFoundError } from '../utils/errors/notFoundError';

export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository
    ) { }
    private safeUser(data: User): SafeUser {
        const { password, ...safeUser } = data;

        return safeUser;
    }
    async getAllUser(): Promise<SafeUser[]> {
        const users = await this.userRepository.getAllUser();
        return users.map(user => this.safeUser(user));
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

        const updatedUser = this.safeUser(await this.userRepository.updateUser(id, updatedUserName));

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

        const updatedUser = this.safeUser(await this.userRepository.updateUser(id, updatedUserEmail));

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

        const updatedPassword = this.safeUser(await this.userRepository.updateUser(id, updatedUserPassword));
        if (!updatedPassword) return false;
        return true;
    }
    async deleteUser(id: string): Promise<boolean> {
        try {
            await this.userRepository.deleteUser(id);
            return true;
        } catch (error) {
            throw new NotFoundError("User with the given ID does not exist.");
        }
    }
}
import { IUserService, IUserRepository } from "../interfaces/user.interface";
import {
  UpdateUserName,
  UpdateUserEmail,
  UpdateUserPassword,
} from "../schemas/user.schema";
import { SafeUser, User } from "../types/auth.types";
import { NotFoundError } from "../utils/errors/notFoundError";
import { VerificationService } from "./verification.service";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private verificationService: VerificationService,
  ) {}
  private safeUser(data: User): SafeUser {
    const { password, ...safeUser } = data;

    return safeUser;
  }
  async getAllUser(): Promise<SafeUser[]> {
    const users = await this.userRepository.getAllUser();
    return users.map((user) => this.safeUser(user));
  }
  async getProfile(id: string): Promise<SafeUser> {
    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new NotFoundError("User with the given ID does not exist.");
    }

    const user = this.safeUser(existingUser);

    return user;
  }
  async getProfileById(id: string): Promise<SafeUser> {
    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new NotFoundError("User with the given ID does not exist.");
    }

    const user = this.safeUser(existingUser);

    return user;
  }
  async updateUserName(id: string, data: UpdateUserName): Promise<SafeUser> {
    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new NotFoundError("User with the given ID does not exist.");
    }

    const updatedUserName: Partial<User> = {
      ...existingUser,
      name: data.name,
    };

    const updatedUser = this.safeUser(
      await this.userRepository.updateUser(id, updatedUserName),
    );

    return updatedUser;
  }

  async updateUserEmail(id: string, data: UpdateUserEmail): Promise<SafeUser> {
    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new NotFoundError("User with the given ID does not exist.");
    }

    // Trigger email verification instead of immediate change
    await this.verificationService.initiateEmailUpdate(id, data.email);

    return this.safeUser(existingUser); // New email is not yet updated
  }
  async updateUserPassword(
    id: string,
    data: UpdateUserPassword,
  ): Promise<boolean> {
    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new NotFoundError("User with the given ID does not exist.");
    }

    // Trigger password reset verification instead of immediate change
    await this.verificationService.initiatePasswordReset(existingUser.email);

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

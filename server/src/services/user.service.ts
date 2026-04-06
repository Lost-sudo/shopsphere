import { IUserService, IUserRepository } from "../interfaces/user.interface";
import {
  UpdateUserName,
  UpdateUserEmail,
  UpdateUserPassword,
  UpdateUserRole,
  AdminCreateUser,
} from "../schemas/user.schema";
import { SafeUser, User } from "../types/auth.types";
import { NotFoundError } from "../utils/errors/notFoundError";
import { VerificationService, verificationService } from "./verification.service";
import { userRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/hash.util";
import { BadRequestError } from "../utils/errors/badRequestError";

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

  async updateUserRole(id: string, data: UpdateUserRole): Promise<SafeUser> {
    const existingUser = await this.userRepository.getUserById(id);

    if (!existingUser) {
      throw new NotFoundError("User with the given ID does not exist.");
    }

    const updatedUser = this.safeUser(
      await this.userRepository.updateUser(id, { role: data.role }),
    );

    return updatedUser;
  }

  async adminCreateUser(data: AdminCreateUser): Promise<SafeUser> {
    const existingUser = await this.userRepository.getUserByEmail(data.email);

    if (existingUser) {
      throw new BadRequestError("User with this email already exists.");
    }

    const hashedPassword = await hashPassword(data.password);
    
    // Create the user with email verified
    const newUser = await this.userRepository.createUser({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    // Update role and set email verified flag to true immediately 
    // since an admin created them.
    const finalUser = await this.userRepository.updateUser(newUser.id, {
        role: data.role,
        emailVerified: true
    });

    return this.safeUser(finalUser);
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

export const userService = new UserService(userRepository, verificationService);

import { User } from "@/features/auth/auth.types";

export type GetAllUsersResponse = {
  success: boolean;
  message: string;
  users: User[];
};

export type GetUserByIdResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type DeleteUserResponse = {
  success: boolean;
  message: string;
};

export type AdminCreateUserRequest = {
  email: string;
  name: string;
  password: string;
  role: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";
};

export type AdminCreateUserResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type UpdateUserRoleRequest = {
  id: string;
  role: "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";
};

export type UpdateUserRoleResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type UpdateProfileRequest = {
  name: string;
};

export type UpdateProfileResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type UpdateEmailRequest = {
  email: string;
};

export type UpdateEmailResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type UpdatePasswordRequest = {
  password: string;
};

export type UpdatePasswordResponse = {
  success: boolean;
  message: string;
};

import { baseApi } from "@/lib/baseApi";
import {
  GetAllUsersResponse,
  GetUserByIdResponse,
  DeleteUserResponse,
  AdminCreateUserRequest,
  AdminCreateUserResponse,
  UpdateUserRoleRequest,
  UpdateUserRoleResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from "./user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetAllUsersResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getUserById: builder.query<GetUserByIdResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Users", id }],
    }),

    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    adminCreateUser: builder.mutation<AdminCreateUserResponse, AdminCreateUserRequest>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUserRole: builder.mutation<UpdateUserRoleResponse, UpdateUserRoleRequest>({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),

    updateProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: "/users",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateEmail: builder.mutation<UpdateEmailResponse, UpdateEmailRequest>({
      query: (body) => ({
        url: "/users/email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: "/users/password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useAdminCreateUserMutation,
  useUpdateUserRoleMutation,
  useUpdateProfileMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} = userApi;

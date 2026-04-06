import { baseApi } from "@/lib/baseApi";
import {
  GetAllUsersResponse,
  GetUserByIdResponse,
  DeleteUserResponse,
  AdminCreateUserRequest,
  AdminCreateUserResponse,
  UpdateUserRoleRequest,
  UpdateUserRoleResponse,
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
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useAdminCreateUserMutation,
  useUpdateUserRoleMutation,
} = userApi;

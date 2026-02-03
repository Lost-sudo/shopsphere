import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { GetMeResponse, User } from "./auth.types";
import { LoginResponse } from "./auth.types";

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload.user;
        },
        setAuthUser: (state, action: PayloadAction<GetMeResponse>) => {
            state.user = action.payload.user;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, setAuthUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

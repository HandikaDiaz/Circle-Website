import { UserStoreDTO } from "../features/auth/types/dto";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserStoreDTO = {} as UserStoreDTO;

export const fetchDummyUser = createAsyncThunk(
    "user/fetchDummyUsers",
    async () => {
        const response = await fetch ("https://jsonplaceholder.typicode.com/users");
        return response.json();
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserStoreDTO>) {
            return {
                ...state,
                id: action.payload.id,
                fullName: action.payload.fullName,
                email: action.payload.email,
                role: action.payload.role
            };
        },
        removeUser() {
            return {} as UserStoreDTO;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDummyUser.fulfilled, (state, action) => {
            return {
                ...state,
                test: action.payload
            }
        })
    }
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
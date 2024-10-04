import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
// import postReducer from "./post.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // post: postReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
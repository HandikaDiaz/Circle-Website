import { createSlice } from "@reduxjs/toolkit";
import { PostStoreDTO } from "../features/auth/types/post.dto";

const initialState: {post : PostStoreDTO[]} = {post : []}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPost(state, action) {
            state.post = action.payload
        },
        setPostLike(state, action: {payload: {id: number, isLike: boolean}}) {
            const {id, isLike} = action.payload
            state.post = state.post.map((post) => {
                if (post.id === id) {
                    return {
                        ...post,
                        // likeCount: isLike ? post.likesCount - 1 : post.likesCount + 1,
                        isLike: !isLike
                    }
                }
                return post
            })
        }
    },
});

export const { getPost, setPostLike } = postSlice.actions;
export default postSlice.reducer;
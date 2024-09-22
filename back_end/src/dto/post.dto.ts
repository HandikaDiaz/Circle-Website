export type CreatePostDTO = {
    content?: string;
    image?: string;
}

export type UpdatePostDTO = CreatePostDTO & {
    id: number;
};
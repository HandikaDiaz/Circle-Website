export type CreatePostDTO = {
    authorId: number;
    content?: string;
    image?: string;
}

export type PostResponseDTO = {
    id: number;
    content: string;
    image?: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type UpdatePostDTO = CreatePostDTO & {
    id: number;
};
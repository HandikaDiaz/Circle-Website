export type CreatePostDTO = {
    authorId: number;
    content?: string;
    image?: string;
    mainReplyId?: number
}

export type PostResponseDTO = {
    id: number;
    content: string;
    image?: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    mainPostId?: number
};

export type UpdatePostDTO = CreatePostDTO & {
    id: number;
};
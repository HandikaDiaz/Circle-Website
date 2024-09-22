export type ReplyDTO = {
    image?: string;
    content?: string;
    likesCount?: number;
    repliesCount?: number;
    postId: number;
}

export type UpdateReplyDTO = ReplyDTO & {
    id: number;
};
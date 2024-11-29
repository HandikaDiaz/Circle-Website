import { CreateReplyEntity } from "../../../entities/repyl-entity";

export type ReplyDTO = CreateReplyEntity;

export type CreateReplyDTO = Pick<
    CreateReplyEntity,
    'content' | 'image'> & {
        postId: number;
    };
import { ReplyEntity } from "../../../entities/repyl-entity";

export type ReplyDTO = ReplyEntity;

export type CreateReplyDTO = Pick<
    ReplyEntity, 
    'content' | 'image'
>;
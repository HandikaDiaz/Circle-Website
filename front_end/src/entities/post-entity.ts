import { ReplyEntity } from "./repyl-entity";
import { UserEntity } from "./user-entity";

export interface PostEntity {
    id: number;
    content?: string;
    image?: string;
    likesCount?: number;
    repliesCount?: number;
    createdAt: Date;
    updatedAt: Date;
    author:  Omit<UserEntity, 'password'>;
    Reply: ReplyEntity[];
}
import { ReplyEntity } from "./repyl-entity";
import { UserEntity } from "./user-entity";

export interface GetPostEntity {
    id: number;
    content?: string;
    image?: string | null;
    likesCount?: number;
    repliesCount?: number;
    timeAgo?: string;
    createdAt: string;
    updatedAt: Date;
    author:  Omit<UserEntity, 'password'>;
    Reply: ReplyEntity[];
}

export interface CreatePostEntity {
    id: number;
    content?: string;
    image?: FileList;
    likesCount?: number;
    repliesCount?: number;
    timeAgo?: string;
    createdAt: string;
    updatedAt: Date;
    author:  Omit<UserEntity, 'password'>;
    Reply: ReplyEntity[];
}
import { PostEntity } from "../../../entities/post-entity";

export type PostDTO = PostEntity;

export type CreatePostDTO = Pick<
    PostEntity, 
    'content' | 'image'
>;
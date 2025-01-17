import { CreatePostEntity } from "../../../entities/post-entity";

export type PostDTO = CreatePostEntity;

export type CreatePostDTO = Pick<
    CreatePostEntity,
    'content' | 'image'> & {
        authorId: number;
    };

export type EditPostDTO = Pick<CreatePostEntity, 'content' | 'image'>;

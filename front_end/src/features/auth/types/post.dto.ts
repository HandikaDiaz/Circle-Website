import { GetPostEntity } from "../../../entities/post-entity";

export interface PostDTO extends GetPostEntity {
    isLike: boolean
}

export type PostStoreDTO = PostDTO;
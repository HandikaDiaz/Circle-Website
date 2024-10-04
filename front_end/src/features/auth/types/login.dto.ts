import { UserEntity } from "../../../entities/user-entity";

export type LoginRequestDTO = Pick<
    UserEntity, 
    "email" | "password" | "userName"
>;

export type LoginResponseDTO = {
    user: UserEntity;
    token: string;
};
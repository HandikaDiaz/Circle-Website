import { UserEntity } from "../../../entities/user-entity";

export type LoginRequestDTO = Pick<
    UserEntity, 
    "email" | "password"
>;

export type LoginResponseDTO = {
    user: UserEntity;
    token: string;
};
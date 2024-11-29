import { UserEntity } from "../../../entities/user-entity";

export interface ForgotEmailForm {
    userName: string;
}

export interface ResponseForgotEmailForm {
    token: string;
}

export interface ResetPasswordForm {
    password: string;
}

export interface ResponseResetPasswordForm {
    password: string;
}

export type UserStoreDTO = Omit<UserEntity, "password">
export type RegisterDTO = {
    fullName: string;
    email: string;
    password: string;
}

export type LoginDTO = {
    userName: string;
    password: string;
}

export type forgotPasswordDTO = {
    userName: string;
}
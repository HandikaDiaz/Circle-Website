export type UserDTO = {
    fullName: string;
    userName: string;
    bio: string;
}

export type UpdateUserDTO = Pick<UserDTO, 'fullName' | 'userName' | 'bio'>

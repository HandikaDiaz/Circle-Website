export type UserDTO = {
    id: number;
    fullName: string;
    userName: string;
    bio: string;
}

export type UpdateUserDTO = Pick<UserDTO, 'fullName' | 'userName' | 'bio' | 'id'>

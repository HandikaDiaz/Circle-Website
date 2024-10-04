export type UserDTO = {
    id: number;
    fullName: string;
    userName: string;
    bio: string;
    image: string;
    background: string;
}

export type UpdateUserDTO = Pick<UserDTO, 'fullName' | 'userName' | 'bio' | 'image' | 'id' | 'background'>

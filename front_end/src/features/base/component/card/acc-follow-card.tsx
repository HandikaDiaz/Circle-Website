import { Box, Image, Text } from "@chakra-ui/react";
import FollowButton from "../../button/follow";
import { ButtonLink } from "../../button/link";
import { useAllUsers } from "../../hooks/use-all";
import { UserEntity } from "../../../../entities/user-entity";
import { useEffect, useState } from "react";


export function AccFollowCard() {
    const { data } = useAllUsers();
    const [randomUsers, setRandomUsers] = useState<UserEntity[]>([]);
    const getRandomUsers = (users: UserEntity[]): UserEntity[] => {
        if (!users || users.length === 0) return [];
        const shuffled = users.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };
    useEffect(() => {
        if (data && randomUsers.length === 0) {
            const selectedUsers = getRandomUsers(data);
            setRandomUsers(selectedUsers);
        }
    }, [data]);
    
    return (
        <>
            {randomUsers?.map((user) => {
                return (
                    <Box
                        mt={'13px'}
                        bg={'none'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'space-between'}>
                        <Box
                            display={'flex'}
                            bg={'none'}
                            alignItems={'center'} >
                            <Image
                                alt=''
                                top={'115px'}
                                left={'30px'}
                                boxSize='40px'
                                display={'block'}
                                borderRadius='500px'
                                src={user.image} />

                            <ButtonLink textDecoration={'none'} state={user.id} to={`/profile-people/${user.id}`} bg={'none'}>
                                <Text
                                    as={'p'}
                                    ms={'10px'}
                                    color={'nav.text'}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    transition={"color 0.2s ease-in-out"}
                                    _hover={{ color: 'nav.button.hoverText' }}>{user.fullName}
                                    <Text
                                        fontSize={'10px'}
                                        color={'nav.link'}>@{user.userName}</Text>
                                </Text>
                            </ButtonLink>
                        </Box>
                        <Box bg={'none'}>
                            <FollowButton userId={user.id} />
                        </Box>
                    </Box>
                )
            })
            }
        </>
    )
}
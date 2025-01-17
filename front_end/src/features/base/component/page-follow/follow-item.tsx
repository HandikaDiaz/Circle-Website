import { Box, Image, Text } from "@chakra-ui/react";
import FollowButton from "../../button/follow";
import { ButtonLink } from "../../button/link";
import { useFollowers } from "../../hooks/use-user";


export function FollowItem() {
    const { data } = useFollowers();

    return (
        <>
            {data?.map((user) => {
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
                                src={user.following.image} />

                            <ButtonLink textDecoration={'none'} state={user.id} to={`/profile-people/${user.followingId}`} bg={'none'}>
                                <Text
                                    as={'p'}
                                    ms={'10px'}
                                    color={'nav.text'}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    transition={"color 0.2s ease-in-out"}
                                    _hover={{ color: 'nav.button.hoverText' }}>{user.following.fullName}
                                    <Text
                                        fontSize={'10px'}
                                        color={'nav.link'}>@{user.following.userName}</Text>
                                </Text>
                            </ButtonLink>
                        </Box>
                        <Box bg={'none'}>
                            <FollowButton userId={user.followingId} />
                        </Box>
                    </Box>
                )
            })
            }
        </>
    )
}
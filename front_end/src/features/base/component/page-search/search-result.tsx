import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { UserEntity } from "../../../../entities/user-entity";
import { SearchNoResult } from "./search-no-result";
import { FaComments } from "react-icons/fa";
import LikeButton from "../../button/like";
import { ButtonLink } from "../../button/link";
import FollowButton from "../../button/follow";

interface SearchResultProps {
    result: UserEntity[];
}

export function SearchResult({ result }: SearchResultProps) {
    if (result.length === 0) {
        return (
            <SearchNoResult />
        );
    }

    return (
        <>
            {result.map((user) => {
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
                                src='https://bit.ly/dan-abramov' />

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
            })}
        </>
    );
}

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { RiUserSearchLine } from "react-icons/ri";
import { UserEntity } from "../../../../entities/user-entity";
import { apiV1 } from "../../../../libs/api";
import { SearchResult } from "./search-result";

export function SearchInput() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [result, setResult] = useState<UserEntity[]>([]);
    const [, setLoading] = useState<boolean>(false);
    const token = Cookies.get('token');
    let userLogin = null;
    useEffect(() => {
        search();
    }, [searchQuery])
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const decodedPayload = JSON.parse(atob(payloadBase64));
                userLogin = decodedPayload;
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }

    const search = async () => {
        setLoading(true);
        try {
            const response = await apiV1.get<UserEntity[]>('/search', {
                params: {
                    query: searchQuery
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const filterUser = response.data.filter(
                (user) => user.id !== userLogin?.id
            );
            setResult(filterUser);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <>
            <InputGroup
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}>
                <InputLeftElement
                    left={'16px'}
                    fontSize={'20px'}
                    pointerEvents="none"
                    children={<RiUserSearchLine style={{ color: '#B2B2B2', backgroundColor: '#3F3F3F' }} />} />

                <Input
                    ms={'13px'}
                    type='search'
                    bg={'#3F3F3F'}
                    p={'18px 40px'}
                    width={'600px'}
                    height={'25px'}
                    fontSize={'14px'}
                    color={'home.text'}
                    fontWeight={'bold'}
                    borderRadius={'25px'}
                    border={'1px solid #3F3F3F'}
                    placeholder="Search your friend"
                    onChange={(e) => setSearchQuery(e.target.value)} />
            </InputGroup>
            <SearchResult result={result} />
        </>
    )
}
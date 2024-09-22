import { InputLeftElement, Input, InputGroup } from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";
import { useState } from 'react';
import { apiV1 } from "../../../../libs/api";


export function SearchInput() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await apiV1.get(`/search/users?q=${query}`, {
                params: { query }
            });
            setResult(response.data);
        } catch (err) {
            console.log(err);
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
                    onChange={(e) => setQuery(e.target.value)}/>
                <button onClick={handleSearch}>Cari</button>
            </InputGroup>
        </>
    )
}
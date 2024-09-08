import { InputLeftElement, Input, InputGroup } from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";


export function SearchInput() {
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
                    placeholder="Search your friend" />
            </InputGroup>
        </>
    )
}
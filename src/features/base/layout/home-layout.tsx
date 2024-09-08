
import { HomeItem } from "../component/page-home/home-item";
import { HomePost } from "../component/page-home/home-post";
import { Text } from "@chakra-ui/react";

export function HomeLayout() {
    return(
        <>
            <Text
                fontSize={'20px'}
                mt={'20px'} 
                px={'25px'} 
                color={'home.title'}>Home</Text>
            <HomePost />
            <HomeItem />
        </>
    )
}
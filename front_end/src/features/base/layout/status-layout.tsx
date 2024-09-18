
import { Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HomeItem } from "../component/page-home/home-item";
import { StatusItem } from "../component/page-status/status-item";
import { StatusReply } from "../component/page-status/status-reply";
import { ButtonLink } from "../link/link";

export function StatusLayout() {
    return (
        <>
            <ButtonLink to={"/"}>
                <Text
                    as={'h2'}
                    px={'25px'}
                    mt={'15px'}
                    width={'50%'}
                    display={'flex'}
                    color={'home.text'}
                    transition={'0.3s'}
                    alignItems={'center'}
                    _hover={{color: 'home.hoverText'}}>
                    <IoIosArrowRoundBack style={{ marginRight: '5px', fontSize: '30px' }} />Status</Text>
            </ButtonLink>

            <StatusItem />
            <StatusReply />
            <HomeItem />
        </>
    )
}

import { Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ProfileStatus } from "../component/page-profile/profile-status";
import { ProfileTabs } from "../component/page-profile/profile-tab";
import { ButtonLink } from "../link/link";

export function ProfileLayout() {
    return (
        <>
            <ButtonLink color={'white'} textDecoration={'none'} to={"/"} bg={'none'}>
                <Text
                    as={'h2'}
                    mt={'15px'}
                    px={'25px'}
                    display={'flex'}
                    color={'home.title'}
                    alignItems={'center'}><IoIosArrowRoundBack style={{ marginRight: '5px', fontSize: '30px' }} />✨ Stella Audhina ✨</Text>
            </ButtonLink>

            <ProfileStatus />
            <ProfileTabs />
        </>
    )
}
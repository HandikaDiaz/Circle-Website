
import { Text } from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ProfileStatusPeople } from "../component/page-profile-people/profile-status-people";
import { ProfileTabsPeople } from "../component/page-profile-people/profile-tab";
import { ButtonLink } from "../link/link";

export function ProfilePeopleLayout() {
    return(
        <>
            <ButtonLink to={"/"} textDecoration={'none'}>
            <Text
                as={'h2'}
                mt={'15px'} 
                px={'25px'}
                display={'flex'}
                color={'home.text'}
                alignItems={'center'}>
                <IoIosArrowRoundBack style={{marginRight:'5px', fontSize:'30px'}}/>✨ Audhina ✨</Text>
            </ButtonLink>

            <ProfileStatusPeople/>
            <ProfileTabsPeople/>
        </>
    )
}
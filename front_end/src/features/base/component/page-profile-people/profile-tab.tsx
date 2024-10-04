import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ProfilePostPeople } from "./profile-item-people";
import { ProfileMediaPeople } from "./profile-media-people";

export function ProfileTabsPeople() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'15px'}
            alignItems={'center'}
            borderBottom={'1px solid #3F3F3F'}>

            <Tabs variant={'unstyled'} position='relative' >
                <TabList
                    display={'flex'}
                    color={'home.text'}
                    alignItems={'center'}
                    pb={'13px'}
                    justifyContent={'center'}
                    borderBottom={'1px solid #3F3F3F'}>
                    <Tab w={'50%'} cursor={'pointer'} py={'3px'} border={'none'} color={'home.button.text'} _hover={{color:'home.hoverText'}} transition={'all 0.2s'}>All Post</Tab>
                    <Tab w={'50%'} cursor={'pointer'} py={'3px'} border={'none'} color={'home.button.text'} _hover={{color:'home.hoverText'}} transition={'all 0.2s'}>Media</Tab>
                </TabList>
                <TabIndicator height='2px' bg='home.hoverBackground' borderRadius='1px' />

                <TabPanels>
                    <TabPanel width={'100%'}>
                        <ProfilePostPeople />
                    </TabPanel>
                    <TabPanel>
                        <ProfileMediaPeople />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

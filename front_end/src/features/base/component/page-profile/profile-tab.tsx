import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { ProfilePost } from "./profile-item";
import { ProfileMedia } from "./profile-media";

export function ProfileTabs() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'15px'}
            alignItems={'center'}>

            <Tabs variant={'unstyled'} position='relative' >
                <TabList 
                    pb={'13px'}
                    display={'flex'}
                    alignItems={'center'} 
                    justifyContent={'center'}
                    borderBottom={'1px solid #3F3F3F'}>
                    <Tab w={'50%'} cursor={'pointer'} py={'3px'} border={'none'} color={'home.text'} _hover={{color:'home.hoverText'}} transition={'all 0.2s'}>All Post</Tab>
                    <Tab w={'50%'} cursor={'pointer'} py={'3px'} border={'none'} color={'home.text'} _hover={{color:'home.hoverText'}} transition={'all 0.2s'}>Media</Tab>
                </TabList>
                <TabIndicator height='2px' bg='home.hoverText' borderRadius='1px' />

                <TabPanels>
                    <TabPanel width={'100%'}>
                        <ProfilePost />
                    </TabPanel>
                    <TabPanel>
                        <ProfileMedia />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

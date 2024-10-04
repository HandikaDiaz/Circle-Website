
import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { DeleteUser } from "./allUser";
import { DeletePost } from "./allPost";

export function AdminPost() {
    return (
        <Box
            mt={'20px'}
            px={'25px'}
            pb={'20px'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text color={'home.text'} as={'h1'}>Access</Text>

            <Tabs variant={'unstyled'} position='relative' >
                <TabList 
                    pb={'13px'}
                    display={'flex'}
                    alignItems={'center'} 
                    justifyContent={'center'}
                    borderBottom={'1px solid #3F3F3F'}>
                    <Tab w={'50%'} cursor={'pointer'} py={'3px'} border={'none'} color={'home.text'} _hover={{color:'home.hoverText'}} transition={'all 0.2s'}>All Posts</Tab>
                    <Tab w={'50%'} cursor={'pointer'} py={'3px'} border={'none'} color={'home.text'} _hover={{color:'home.hoverText'}} transition={'all 0.2s'}>All Users</Tab>
                </TabList>
                <TabIndicator height='2px' bg='home.hoverText' borderRadius='1px' />

                <TabPanels>
                    <TabPanel width={'100%'}>
                        <DeletePost />
                    </TabPanel>
                    <TabPanel>
                        <DeleteUser />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
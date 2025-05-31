import { Box, Image, Stack, Text } from "@chakra-ui/react";
import AnnouncementBar from "./AnnouncementBar";
import homeImg from '../assets/rr-home.jpg'

export const FrontPage = () => {
    return (
        <>
            <Box w={'full'} position={'relative'}>
                <AnnouncementBar />
            </Box>
            <Stack minH={{ base: '30vh', md: '50vh' }} justifyContent={{base: 'space-between', md: 'space-around'}} alignItems={'center'} display={'flex'} direction={{ base: 'row', md: 'row' }}>
                <Text color={'#6B7280'} fontSize={{ base: '16px', md: '48px' }}>
                    राह सही हो तो,<br />
                    कठिनाई भी आसान लगती है।
                </Text>
                <Image minW={{base:"147px", md:"295.35px"}} maxH={{ base: '20vh', md: '40vh' }} src={homeImg}></Image>
            </Stack>
            
        </>
    );
}
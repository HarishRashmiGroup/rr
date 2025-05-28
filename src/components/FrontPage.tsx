import { Box, Image, Stack, Text } from "@chakra-ui/react";
import AnnouncementBar from "./AnnouncementBar";

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
                <Image maxH={{ base: '20vh', md: '60vh' }} src={'../src/assets/rr-home.jpg'}></Image>
            </Stack>
            
        </>
    );
}
import { Box, Image, Text } from "@chakra-ui/react";
import img from '../assets/comming.webp';

const FullScreenLoader = () => {

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="rgba(150, 144, 144, 0.9)"
            zIndex={100}
        >
            <Image src={img} maxW={'200px'} borderRadius={'md'} />
            <Text position={'absolute'} top={'60%'} color={'red.600'}>Comming Soon</Text>
        </Box>
    );
};

export default FullScreenLoader;

import { Box, Image, Text, VStack } from "@chakra-ui/react";
import img from '../assets/comming.webp';

const ComingSoon = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      backgroundColor="gray.800"
      color="white"
      zIndex={100}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      opacity={0.9}
    >
      <VStack>
        <Image src={img} maxW="250px" borderRadius="md" />
        <Text fontSize="2xl" fontWeight="bold" color="teal.400">
          We're working behind the scenes to launch soon.
        </Text>
      </VStack>
    </Box>
  );
};

export default ComingSoon;

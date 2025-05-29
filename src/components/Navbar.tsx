import { Box, Button, Icon, Image, Text } from "@chakra-ui/react";
import { UserPlus2 } from "lucide-react";
import logo from '../assets/rr.png';

export const Navbar = () => {
    return (
        <Box bg={'white'} position={'sticky'} top={0} zIndex={99} display={'flex'} justifyContent={'space-between'} p={4} borderBottom={'2px solid #5d93fe'}>
            <Box display={'flex'} justifyContent={'left'}>
                <Box>
                    <Image src={logo} alt="" boxSize="40px" mr={3} />
                </Box>
                <Text mt={1} lineHeight={1}>Rajasthan<br />Recruitment</Text>
            </Box>
            <Button
                variant="outline"
                color="#5d93fe"
                borderColor={'#5d93fe'}
                borderRadius="md"
            >
                <Icon as={UserPlus2} boxSize={4} mr={2} />
                Join
            </Button>
        </Box>
    );

}
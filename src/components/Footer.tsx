import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Link,
  VStack,
  HStack,
  useBreakpointValue
} from '@chakra-ui/react';

const Footer: React.FC = () => {
  const flexDirection = useBreakpointValue({ base: 'column', lg: 'row' });
  const mapSize = useBreakpointValue({ base: { width: '100%', height: '120px' }, md: { width: '200px', height: '150px' } });
  const [currentDate, setCurrentDate] = useState(new Date());
  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  return (
    <Box>
      <Box
        bg="#DEE9FF"
        p={5}
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
      >
        <Flex
          direction={flexDirection}
          justify="space-between"
          align="center"
          gap={6}
          wrap="wrap"
        >
          {/* Left Section */}
          <VStack flex={1} align="flex-start" minW="250px">
            <HStack >
              <Image
                src="../src/assets/rr.png"
                height="45px"
                width="auto"
                alt="Logo"
                pointerEvents="none"
                userSelect="none"
              />
              <VStack align="flex-start" >
                <HStack>
                  <Text color="#5d93fe" fontSize="lg" lineHeight={1} fontWeight="medium" userSelect="none">
                    Rajasthan<br/>Recruitement
                  </Text>
                  <Text as="span" ml={3} position="relative" top={-4}>
                    🇮🇳
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <Text color="#5d93fe" fontSize="sm">
              Designed and developed in <b>भारत</b>
            </Text>
          </VStack>

          {/* Center Section */}
          <Box flex={2} display="flex" justifyContent="center">
            <Box>
              <Flex gap={8} direction={{ base: 'column', md: 'row' }} align="center">
                <Box>
                  <Link
                    href="/terms"
                    color="#5d93fe"
                    fontSize="md"
                    textDecoration="none"
                    _hover={{ textDecoration: 'underline', color: '#4a7cfe' }}
                  >
                    Terms and Conditions
                  </Link>
                </Box>
                <Box>
                  <Link
                    href="/privacy"
                    color="#5d93fe"
                    fontSize="md"
                    textDecoration="none"
                    _hover={{ textDecoration: 'underline', color: '#4a7cfe' }}
                  >
                    Privacy Policy
                  </Link>
                </Box>
                <Box>
                  <Link
                    href="/contact"
                    color="#5d93fe"
                    fontSize="md"
                    textDecoration="none"
                    _hover={{ textDecoration: 'underline', color: '#4a7cfe' }}
                  >
                    Contact Us
                  </Link>
                </Box>
              </Flex>
            </Box>
          </Box>

          {/* Right Section */}
          <Box flex={1} display="flex" justifyContent="center">
            <Box
              maxW="200px"
              h="150px"
              overflow="hidden"
              borderRadius="md"
              boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
              {...mapSize}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7310704.8059636885!2d68.58463542583759!3d26.53041168905066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a3efaf7e30e37%3A0xb52b9b4506c088e5!2sRajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1733551187055!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allowFullScreen
                loading="lazy"
                title="Rajasthan Map"
              />
            </Box>
          </Box>
        </Flex>
      </Box>

      {/* Footer Copyright */}
      <Box
        bg="#5d93fe"
        color="white"
        textAlign="center"
        py={2}
      >
        <Text fontSize="sm" m={0}>
          &copy; {currentDate.getFullYear()} Rajasthan Recruitment. All Rights Reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

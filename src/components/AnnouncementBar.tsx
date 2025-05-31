import React, { useEffect, useRef, useState } from 'react';
import { Box, CloseButton, Flex, Text } from '@chakra-ui/react';

const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const speed = 100;

  const message = '👉 Our website will be undergoing scheduled maintenance on 29 May 2025 from 08:15 PM to 08:45 PM (IST). During this time, the site may be unavailable. We appreciate your patience and understanding.      ';
  const repeatedMessage = message.repeat(10);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const width = el.scrollWidth;
      setDuration(width / speed);
    }
  }, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <Box
        bg="yellow.100"
        color="#E97316"
        px={4}
        py={2}
        overflow="hidden"
        borderRadius="md"
        position="absolute"
        top={-2}
        width={'full'}
      >
        <Flex align="center" justify="space-between">
          <Text borderRadius="md" borderRight="2px solid #E97316" mr={2}>
            📢
          </Text>
          <Box
            flex="1"
            overflow="hidden"
            position="relative"
            mr={4}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              ref={scrollRef}
              display="inline-block"
              whiteSpace="nowrap"
              style={{
                willChange: 'transform',
                animation: `scroll ${duration}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {repeatedMessage}
            </Box>
          </Box>
          <CloseButton
            size={'sm'}
            color="#E97316"
            _hover={{ bg: 'yellow.200' }}
            onClick={() => setIsVisible(false)}
          />
        </Flex>
      </Box>
    </>
  );
};

export default AnnouncementBar;

import React from 'react';
import {
    Box,
    Text,
    Image,
    HStack,
    VStack,
    Icon,
    SimpleGrid,
    Container,
    Flex,
    Badge,
    Avatar
} from '@chakra-ui/react';
import { FiThumbsUp, FiMessageCircle, FiShare2, FiPlay } from 'react-icons/fi';
import advImg from '../assets/rradv.webp';  

interface BlogCardProps {
    id: string;
    title: string;
    image: string;
    source: string;
    timeAgo: string;
    likes: number;
    comments: number;
    shares: number;
    isSponsored?: boolean;
    isLarge?: boolean;
    hasPlayButton?: boolean;
    sourceLogo?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    title,
    image,
    source,
    timeAgo,
    likes,
    comments,
    shares,
    isSponsored = false,
    isLarge = false,
    hasPlayButton = false,
    sourceLogo
}) => {
    return (
        <Box
            bg="white"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="sm"
            border="1px"
            borderColor="gray.100"
            transition="all 0.2s"
            _hover={{
                boxShadow: 'md',
                transform: 'translateY(-2px)',
            }}
            cursor="pointer"
            h="full"
        >
            <Box position="relative">
                <Image
                    src={image}
                    alt={title}
                    w="full"
                    h={isLarge ? "200px" : "150px"}
                    objectFit="cover"
                />
                {hasPlayButton && (
                    <Flex
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        bg="blackAlpha.700"
                        borderRadius="full"
                        p={3}
                        color="white"
                    >
                        <Icon as={FiPlay} boxSize={6} />
                    </Flex>
                )}
                {isSponsored && (
                    <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme="blue"
                        fontSize="xs"
                    >
                        Sponsored
                    </Badge>
                )}
            </Box>

            <VStack p={4} align="start" gap={2}>
                <HStack w="full">
                    {sourceLogo && (
                        <Avatar.Root size={'sm'} key={sourceLogo}>
                            <Avatar.Fallback name={source} />
                            <Avatar.Image src={sourceLogo} />
                        </Avatar.Root>
                    )}
                    <Text fontSize="sm" color="gray.600" fontWeight="medium">
                        {source}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        •
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        {timeAgo}
                    </Text>
                </HStack>

                <Text
                    fontSize={isLarge ? "lg" : "md"}
                    fontWeight="semibold"
                    color="gray.800"
                    lineHeight="1.4"
                    maxLines={isLarge ? 3 : 2}
                >
                    {title}
                </Text>

                <HStack pt={2} w="full">
                    <HStack color="gray.500" _hover={{color:'#5d93fe'}}>
                        <Icon as={FiThumbsUp} boxSize={4} />
                        <Text fontSize="sm">{likes}</Text>
                    </HStack>
                    <HStack color="gray.500" _hover={{color:'#5d93fe'}}>
                        <Icon as={FiMessageCircle} boxSize={4} />
                        <Text fontSize="sm">{comments}</Text>
                    </HStack>
                    <HStack color="gray.500" _hover={{color:'#5d93fe'}}>
                        <Icon as={FiShare2} boxSize={4} />
                        <Text fontSize="sm">{shares}</Text>
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );
};

const BlogHome: React.FC = () => {
    const blogData: BlogCardProps[] = [
        {
            id: '1',
            title: 'Highest Salaries On Indian TV: What Salman Khan, Kapil Sharma And Rupali Ganguly...',
            image: 'https://th.bing.com/th?id=ORMS.29d6c048542b27a7b3cbda5d1392427e&pid=Wdp&w=268&h=140&qlt=90&c=1&rs=1&dpr=1.25&p=0',
            source: 'News18',
            timeAgo: '15h',
            likes: 7,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '2',
            title: 'Gold And Silver Price Today — Check Prices In Mumbai, Bengaluru, Delhi, Chennai...',
            image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=200&fit=crop',
            source: 'NDTV Profit',
            timeAgo: '6h',
            likes: 2,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '3',
            title: 'Start Free Today - #1 Project Planning Tools - Productivity Tools Done Better',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            source: 'atlassian.com',
            timeAgo: '',
            likes: 0,
            comments: 0,
            shares: 0,
            isSponsored: true,
            hasPlayButton: true
        },
        {
            id: '4',
            title: 'England Lions vs India A, 1st Unofficial Test, Live streaming: Squads, timing, ...',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop',
            source: 'India Today',
            timeAgo: '7h',
            likes: 18,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '5',
            title: 'Woman reveals she lost 22 kg in 1 year by eating omelet daily for breakfast: Does this really work and...',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=200&fit=crop',
            source: 'Hindustan Times',
            timeAgo: '3d',
            likes: 12,
            comments: 0,
            shares: 0,
            isLarge: true,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '6',
            title: 'Microsoft Layoffs: CEO Satya Nadella Reveals Reason, Chief Product Officer Has...',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
            source: 'News18',
            timeAgo: '1h',
            likes: 3,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '7',
            title: 'AB de Villiers Brutally Slams IPL 2025 Commentators Over Negative Remarks On RCB,...',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=200&fit=crop',
            source: 'Times Now',
            timeAgo: '1d',
            likes: 75,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '4',
            title: 'England Lions vs India A, 1st Unofficial Test, Live streaming: Squads, timing, ...',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop',
            source: 'India Today',
            timeAgo: '7h',
            likes: 18,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '5',
            title: 'Woman reveals she lost 22 kg in 1 year by eating omelet daily for breakfast: Does this really work and...',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=200&fit=crop',
            source: 'Hindustan Times',
            timeAgo: '3d',
            likes: 12,
            comments: 0,
            shares: 0,
            isLarge: true,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '6',
            title: 'Microsoft Layoffs: CEO Satya Nadella Reveals Reason, Chief Product Officer Has...',
            image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
            source: 'News18',
            timeAgo: '1h',
            likes: 3,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '7',
            title: 'AB de Villiers Brutally Slams IPL 2025 Commentators Over Negative Remarks On RCB,...',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=200&fit=crop',
            source: 'Times Now',
            timeAgo: '1d',
            likes: 75,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '7',
            title: 'AB de Villiers Brutally Slams IPL 2025 Commentators Over Negative Remarks On RCB,...',
            image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=200&fit=crop',
            source: 'Times Now',
            timeAgo: '1d',
            likes: 75,
            comments: 0,
            shares: 0,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
        {
            id: '5',
            title: 'Woman reveals she lost 22 kg in 1 year by eating omelet daily for breakfast: Does this really work and...',
            image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=200&fit=crop',
            source: 'Hindustan Times',
            timeAgo: '3d',
            likes: 12,
            comments: 0,
            shares: 0,
            isLarge: true,
            sourceLogo: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=40&h=40&fit=crop&crop=face'
        },
    ];

    return (
        <Container w={'full'} display={'flex'} gap={4} position={'relative'} py={8} px={0}>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                templateRows="auto"
                gap={4}
            >
                {blogData.map((blog, index) => (
                    <Box
                        key={`${blog.id}_${index}`}
                        gridColumn={{
                            base: "span 1",
                            md: blog.isLarge ? "span 2" : "span 1",
                            lg: blog.isLarge ? "span 2" : "span 1"
                        }}
                    >
                        <BlogCard {...blog} />
                    </Box>
                ))}
            </SimpleGrid>
            <Box maxW={'250px'} display={{ base: 'none', md: 'block' }} position={'relative'}>
                <Image zIndex={2} position={{ base: 'relative', md: 'sticky' }} top={{ base: 'auto', md: '150px' }} src={advImg}></Image>
            </Box>
        </Container>
    );
};

export default BlogHome;
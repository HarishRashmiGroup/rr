import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Stack,
    Image,
    Button,
    Link
} from '@chakra-ui/react';
import {
    MapPin,
    Briefcase,
    Clock,
    ExternalLink,
} from 'lucide-react';
import type { Job } from '../types/Job.type';
const JobCard: React.FC<{
    job: Job;
    onSave: (id: number) => void;
    isSaved: boolean;
}> = ({ job }) => {
    return (
        <Box
            borderBottom={'1px solid #5d93fe'}
            borderRadius="lg"
            p={6}
            bg="white"
            transition="all 0.3s ease"
            _hover={{
                boxShadow: "inset 0 -2px 0 0 #5d93fe",
            }}
            width="100%"
        >
            <Flex justify="space-between" mb={4} wrap="wrap">
                <Flex gap={4}>
                    <Image
                        src={job.logo}
                        alt={`${job.company} logo`}
                        boxSize="48px"
                        objectFit="cover"
                        borderRadius="md"
                    />
                    <Box>
                        <Heading fontSize="lg" mb={1}>{job.title}</Heading>
                        <Flex gap={4} mt={1} fontSize="sm" color="gray.500">
                            <Flex align="center" gap={1}><MapPin size={16} /> {job.location}</Flex>
                            <Flex align="center" gap={1}><Briefcase size={16} /> {job.type}</Flex>
                            <Flex align="center" gap={1}><Clock size={16} /> {job.postedTime}</Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
            <Stack mb={4}>
                {job.registrationStartDate && <Text fontSize="sm"><b>Registration Start Date:</b> {job.registrationStartDate}</Text>}
                {job.closeDate && <Text fontSize="sm"><b>Close Date:</b> {job.closeDate}</Text>}
                {job.examDate && <Text fontSize="sm"><b>Exam Date:</b> {job.examDate}</Text>}
                {job.posts && <Text fontSize="sm"><b>Posts:</b> {job.posts}</Text>}
            </Stack>
            <Flex gap={2}>
                {job.detailsUrl && (
                    <Button size="sm" colorScheme="blue" transition="all 0.5s" _hover={{ bg: '#5d93fe' }}>
                        View Details
                    </Button>
                )}
                {job.officialSiteUrl && (
                    <Link href={job.officialSiteUrl} target='blank'>
                        <Button size="sm" variant="outline" _hover={{ color: '#5d93fe' }}>
                            Official Site <ExternalLink size={14} style={{ marginLeft: '8px' }} />
                        </Button>
                    </Link>
                )}
            </Flex>
        </Box>
    );
};
export default JobCard;
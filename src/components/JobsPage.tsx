import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  IconButton,
  Text,
  Stack,
  Image,
  Badge,
  Button,
} from '@chakra-ui/react';
import {
  MapPin,
  Briefcase,
  Clock,
  ExternalLink,
  Building2,
  Users,
  DollarSign,
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedTime: string;
  logo: string;
  description: string;
  requirements: string[];
  applicants: number;
  isRemote: boolean;
  companySize: string;
  registrationStartDate?: string;
  closeDate?: string;
  examDate?: string;
  posts?: number;
  detailsUrl?: string;
  officialSiteUrl?: string;
  registrationEndDate: string;
}

const jobsData: Job[] = [{
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Solutions",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120k - $160k",
  postedTime: "2 hours ago",
  logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  description: "We're looking for a Senior Frontend Developer to join our growing team. You'll work on cutting-edge React applications and collaborate with designers and backend engineers.",
  requirements: ["5+ years React experience", "TypeScript proficiency", "Modern CSS frameworks"],
  applicants: 47,
  isRemote: false,
  companySize: "201-500 employees",
  registrationStartDate:"24-May-2025",
  examDate:"4-May-2025",
  registrationEndDate:"4-May-2025",
},
{
  id: 2,
  title: "Product Manager",
  company: "InnovateAI",
  location: "Remote",
  type: "Full-time",
  salary: "$130k - $180k",
  postedTime: "4 hours ago",
  logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=64&h=64&fit=crop&crop=faces",
  description: "Lead product strategy and execution for our AI-powered platform. Work closely with engineering, design, and sales teams to deliver exceptional user experiences.",
  requirements: ["3+ years PM experience", "Technical background", "AI/ML knowledge preferred"],
  applicants: 89,
  isRemote: true,
  companySize: "51-200 employees",
  registrationStartDate:"24-May-2025",
  examDate:"4-May-2025",
  registrationEndDate:"4-May-2025",
},
{
  id: 3,
  title: "UX/UI Designer",
  company: "DesignHub",
  location: "New York, NY",
  type: "Contract",
  salary: "$80k - $110k",
  postedTime: "1 day ago",
  logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=64&h=64&fit=crop&crop=faces",
  description: "Create beautiful and intuitive user experiences for our design platform. You'll work on both web and mobile interfaces with a focus on user-centered design.",
  requirements: ["Portfolio required", "Figma expertise", "User research experience"],
  applicants: 124,
  isRemote: false,
  companySize: "11-50 employees",
  registrationStartDate:"24-May-2025",
  examDate:"4-May-2025",
  registrationEndDate:"4-May-2025",
},
{
  id: 4,
  title: "DevOps Engineer",
  company: "CloudScale",
  location: "Austin, TX",
  type: "Full-time",
  salary: "$110k - $150k",
  postedTime: "2 days ago",
  logo: "https://images.unsplash.com/photo-1554774853-719586f82d77?w=64&h=64&fit=crop&crop=faces",
  description: "Join our infrastructure team to build and maintain scalable cloud solutions. You'll work with AWS, Docker, Kubernetes, and modern CI/CD pipelines.",
  requirements: ["AWS certification preferred", "Docker/Kubernetes", "CI/CD experience"],
  applicants: 67,
  isRemote: false,
  companySize: "101-500 employees",
  registrationStartDate:"24-May-2025",
  examDate:"4-May-2025",
  registrationEndDate:"4-May-2025",
},
{
  id: 5,
  title: "Data Scientist",
  company: "DataDriven Analytics",
  location: "Boston, MA",
  type: "Full-time",
  salary: "$140k - $190k",
  postedTime: "3 days ago",
  logo: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b696?w=64&h=64&fit=crop&crop=faces",
  description: "Apply machine learning and statistical analysis to solve complex business problems. Work with large datasets and collaborate with cross-functional teams.",
  requirements: ["PhD/Masters in related field", "Python/R proficiency", "ML frameworks experience"],
  applicants: 203,
  isRemote: false,
  companySize: "501-1000 employees",
  registrationStartDate:"24-May-2025",
  examDate:"4-May-2025",
  registrationEndDate:"4-May-2025",
}
];

const JobCard: React.FC<{
  job: Job;
  onSave: (id: number) => void;
  isSaved: boolean;
}> = ({ job, onSave, isSaved }) => {
  return (
    <Box
      borderBottom={'1px solid #5d93fe'}
      borderRadius="lg"
      p={6}
      bg="white"
      _hover={{ shadow: 'md' }}
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
        <IconButton
          aria-label="Save job"
          onClick={() => onSave(job.id)}
          colorScheme={isSaved ? 'blue' : 'gray'}
          variant="ghost"
        />
      </Flex>

      <Text fontSize="sm"  color="gray.600" mb={3}>{job.description}</Text>

      <Stack mb={4}>
        {job.registrationStartDate && <Text fontSize="sm"><b>Registration Start Date:</b> {job.registrationStartDate}</Text>}
        {job.closeDate && <Text fontSize="sm"><b>Close Date:</b> {job.closeDate}</Text>}
        {job.examDate && <Text fontSize="sm"><b>Exam Date:</b> {job.examDate}</Text>}
        {job.posts && <Text fontSize="sm"><b>Posts:</b> {job.posts}</Text>}
      </Stack>
        <Flex gap={2}>
          {job.detailsUrl && (
            <Button size="sm" colorScheme="blue">
              View Details
            </Button>
          )}
          {job.officialSiteUrl && (
            <Button size="sm" variant="outline">
              Official Site <ExternalLink size={14} style={{ marginLeft: '8px' }}/>
            </Button>
          )}
        </Flex>
    </Box>
  );
};

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());

  const handleSaveJob = (jobId: number) => {
    setSavedJobs(prev => {
      const updated = new Set(prev);
      updated.has(jobId) ? updated.delete(jobId) : updated.add(jobId);
      return updated;
    });
  };

  const filteredJobs = jobsData.filter(job => {
    const searchMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const typeMatch = !jobTypeFilter || job.type === jobTypeFilter;
    return searchMatch && locationMatch && typeMatch;
  });

  return (
    <Box minH="100vh" >
      <Box  mx="auto" px={{ base: 4, lg: 0}} >
        <Heading as="h1" size="xl" mb={8} textAlign="center">Latest Job Notifications</Heading>
        <Flex direction={{ base: 'column', md: 'row' }} gap={6} mb={8}>
          <Input
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="Remote">Remote</option>
            <option value="New York, NY">New York, NY</option>
          </select>
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
          </select>
        </Flex>

        <Flex justify="space-between" mb={4}>
          <Text color="gray.600">Showing {filteredJobs.length} of {jobsData.length} jobs</Text>
          <Flex align="center" gap={2}>
          </Flex>
        </Flex>

        <Stack mb={12}>
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSave={handleSaveJob}
              isSaved={savedJobs.has(job.id)}
            />
          ))}

          {filteredJobs.length === 0 && (
            <Box textAlign="center" py={12} color="gray.500">
              <Briefcase size={48} />
              <Heading size="md" mt={4}>No jobs found</Heading>
              <Text>Try adjusting your search criteria or filters.</Text>
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default JobsPage;

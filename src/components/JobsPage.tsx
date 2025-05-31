import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Grid,
} from '@chakra-ui/react';
import {
  Briefcase,
} from 'lucide-react';

import advImg from '../assets/rr_adv.png';
import type { Job } from '../types/Job.type';
import JobCard from './JobCard';

const jobsData: Job[] = [{
  id: 1,
  title: "HSSC CET 2025",
  company: "TechCorp Solutions",
  location: "India",
  type: "Govt",
  salary: "$120k - $160k",
  postedTime: "2hrs",
  detailsUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://hryssc.in/StaticPages/InstructionPage.aspx",
  logo: "https://th.bing.com/th/id/OSK.rO2Z8IdjWFVcWbMy5Ae1jH4eR9mm7cbzQSJmg9eIvgE?w=102&h=102&c=7&o=6&dpr=1.3&pid=SANGAM",
  description: "The HSSC CET Registration 2025 has finally started on 28 May 2025 on the HSSC website @hssc.gov.in",
  requirements: ["5+ years React experience", "TypeScript proficiency", "Modern CSS frameworks"],
  applicants: 47,
  isRemote: false,
  companySize: "201-500 employees",
  registrationStartDate: "28 May 2025",
  posts: 2123,
  examDate: "4-July-2025",
  registrationEndDate: "4-June-2025",
},
{
  id: 2,
  title: "Haryana HTET 2025",
  company: "InnovateAI",
  location: "Remote",
  type: "Govt",
  salary: "$130k - $180k",
  postedTime: "4 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://hryssc.in/StaticPages/InstructionPage.aspx",
  logo: "https://th.bing.com/th/id/OSK.rO2Z8IdjWFVcWbMy5Ae1jH4eR9mm7cbzQSJmg9eIvgE?w=102&h=102&c=7&o=6&dpr=1.3&pid=SANGAM",
  description: "Lead product strategy and execution for our AI-powered platform. Work closely with engineering, design, and sales teams to deliver exceptional user experiences.",
  requirements: ["3+ years PM experience", "Technical background", "AI/ML knowledge preferred"],
  applicants: 89,
  isRemote: true,
  companySize: "51-200 employees",
  registrationStartDate: "24-May-2025",
  examDate: "4-May-2025",
  registrationEndDate: "4-May-2025",
},
{
  id: 3,
  title: "UPSC CDS 2 2025",
  company: "DesignHub",
  location: "New York",
  type: "Contract",
  salary: "$80k - $110k",
  postedTime: "1 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  logo: "https://th.bing.com/th?id=OVFT.AEA29enfG_TqgoruUSM7wi&pid=News&w=300&h=186&c=14&rs=2&qlt=90&dpr=1.3",
  description: "Create beautiful and intuitive user experiences for our design platform. You'll work on both web and mobile interfaces with a focus on user-centered design.",
  requirements: ["Portfolio required", "Figma expertise", "User research experience"],
  applicants: 124,
  isRemote: false,
  companySize: "11-50 employees",
  registrationStartDate: "24-May-2025",
  examDate: "4-May-2025",
  registrationEndDate: "4-May-2025",
},
{
  id: 4,
  title: "RSMSSB Stenographer 2024",
  company: "CloudScale",
  location: "Austin",
  type: "Govt",
  salary: "$110k - $150k",
  postedTime: "2 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
  logo: "https://th.bing.com/th/id/OIP.PDAARlnQeMQ_RLYFOfg0YgHaEv?w=80&h=80&c=1&bgcl=fee4da&r=0&o=6&dpr=1.3&pid=ImgRC",
  description: "Join our infrastructure team to build and maintain scalable cloud solutions. You'll work with AWS, Docker, Kubernetes, and modern CI/CD pipelines.",
  requirements: ["AWS certification preferred", "Docker/Kubernetes", "CI/CD experience"],
  applicants: 67,
  isRemote: false,
  companySize: "101-500 employees",
  registrationStartDate: "24-May-2025",
  examDate: "4-May-2025",
  registrationEndDate: "4-May-2025",
}, {
  id: 5,
  title: "SSC CGL 2025",
  company: "ExamTrack Inc",
  location: "India",
  type: "Govt",
  salary: "$100k - $140k",
  postedTime: "3 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://ssc.nic.in/",
  logo: "https://th.bing.com/th/id/OIP.vc2Mw_t3aTDuHDmNFfLBtgHaHa?w=102&h=102&c=7&o=6&dpr=1.3&pid=SANGAM",
  description: "The SSC CGL 2025 registration has commenced and is aimed at recruiting candidates for Group B and C posts in various ministries and departments.",
  requirements: ["Graduate in any discipline", "Good analytical skills", "Basic computer knowledge"],
  applicants: 356,
  isRemote: false,
  companySize: "1000+ employees",
  registrationStartDate: "20 May 2025",
  examDate: "15-July-2025",
  registrationEndDate: "10-June-2025"
},
{
  id: 6,
  title: "IBPS PO 2025",
  company: "BankPro Services",
  location: "India",
  type: "Govt",
  salary: "$90k - $120k",
  postedTime: "5 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1536305030431-774b3ae0f49b?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://ibps.in/",
  logo: "https://th.bing.com/th/id/OIP.Qc3XsFJ8NRN04Pb4b9ciFwHaHa?w=102&h=102&c=7&o=6&dpr=1.3&pid=SANGAM",
  description: "IBPS PO is the most awaited exam for bank aspirants in India. Registration is open for 2025 intake with 4000+ vacancies.",
  requirements: ["Bachelor’s Degree", "Proficiency in local language", "Basic computer skills"],
  applicants: 487,
  isRemote: false,
  companySize: "1001-5000 employees",
  registrationStartDate: "22 May 2025",
  examDate: "12-July-2025",
  registrationEndDate: "12-June-2025"
},
{
  id: 7,
  title: "NEET UG 2025",
  company: "EduNext",
  location: "India",
  type: "Govt",
  salary: "N/A",
  postedTime: "6 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://neet.nta.nic.in/",
  logo: "https://th.bing.com/th/id/OIP.DYK6cOwv8hFwQY2YzL6ExgHaHa?w=102&h=102&c=7&o=6&dpr=1.3&pid=SANGAM",
  description: "NEET UG 2025 is the national entrance test for MBBS/BDS admissions across India. The exam is scheduled for August.",
  requirements: ["12th with PCB", "50% marks minimum", "Indian nationality"],
  applicants: 1002,
  isRemote: false,
  companySize: "N/A",
  registrationStartDate: "18 May 2025",
  examDate: "10-Aug-2025",
  registrationEndDate: "20-June-2025"
},
{
  id: 8,
  title: "CUET UG 2025",
  company: "EduSmart",
  location: "India",
  type: "Govt",
  salary: "N/A",
  postedTime: "2 hrs",
  detailsUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=64&h=64&fit=crop&crop=faces",
  officialSiteUrl: "https://cuet.samarth.ac.in/",
  logo: "https://th.bing.com/th/id/OIP.EjknCSYOek7jSYAG8pFV0wHaHa?w=102&h=102&c=7&o=6&dpr=1.3&pid=SANGAM",
  description: "The CUET UG 2025 registration is open for students applying to central universities in India. Exam to be held in July.",
  requirements: ["Passed or appearing 12th", "English proficiency", "University-specific criteria"],
  applicants: 728,
  isRemote: false,
  companySize: "N/A",
  registrationStartDate: "25 May 2025",
  examDate: "15-July-2025",
  registrationEndDate: "20-June-2025"
}

];

const JobsPage: React.FC = () => {
  const [searchTerm] = useState('');
  const [locationFilter] = useState('');
  const [jobTypeFilter] = useState('');
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
      <Box mx="auto" px={0} >
        <Heading as={'h1'} size={'3xl'} color={'#5d93fe'}>Latest Job Notifications</Heading>
        <Stack mb={12} spaceX={4} w={'full'} position={'relative'} direction={{ base: 'column', md: 'row' }}>
          <Grid
            gap={4}
            templateColumns={{ md: '1fr', lg: 'repeat(2, 1fr)' }}
            width="full"
          >
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
          </Grid>
          <Box minW={'120px'} maxW={'250px'} display={{ base: 'none', md: 'block' }} position={'relative'}>
            <Image borderRadius={'md'} zIndex={2} position={{ base: 'relative', md: 'sticky' }} top={{ base: 'auto', md: '150px' }} src={advImg}></Image>
          </Box>
        </Stack>
      </Box>
    </Box >
  );
};

export default JobsPage;

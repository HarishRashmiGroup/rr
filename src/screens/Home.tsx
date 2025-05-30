import { Box, Heading } from "@chakra-ui/react";
import { FrontPage } from "../components/FrontPage";
import { HomePageTabs } from "../components/HomePageTabs";
import BlogHome from "../components/BlogHome";

const Home = () => {
    return (
        <Box p={4}>
            <FrontPage />
            <Box position={'relative'}>
                <HomePageTabs />
            </Box>
            <Heading mt={2} size={'3xl'} color={'#5d93fe'} p={4}>Latest Blogs</Heading>
            <BlogHome/>
        </Box>
    );
}
export default Home;
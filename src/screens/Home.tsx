import { Box } from "@chakra-ui/react";
import { FrontPage } from "../components/FrontPage";
import { HomePageTabs } from "../components/HomePageTabs";

const Home = () => {
    return (
        <Box p={4}>
            <FrontPage />
            <Box position={'relative'}>
                <HomePageTabs />
            </Box>
        </Box>
    );
}
export default Home;
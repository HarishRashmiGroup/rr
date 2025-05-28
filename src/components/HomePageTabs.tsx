import { Tabs } from "@chakra-ui/react"
import JobsPage from "./JobsPage"

export const HomePageTabs = () => {
    return (
        <Tabs.Root defaultValue="jobs" variant="plain">
            <Tabs.List
                bg="gray.100"
                rounded="lg"
                p="1"
                zIndex={98}
                w={'full'}
                gap={2.5}
                position="sticky"
                top={'73px'}
            >
                <Tabs.Trigger
                    value="jobs"
                    px="4"
                    py="2"
                    rounded="md"
                    fontWeight="medium"
                    transition="all 0.2s"
                    _hover={{
                        bg: 'blue.50',
                        color: 'blue.600'
                    }}
                    _selected={{
                        color: 'white',
                        bg: '#5d93fe',
                    }}
                >
                    Jobs
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="admit"
                    px="4"
                    py="2"
                    rounded="md"
                    fontWeight="medium"
                    transition="all 0.2s"
                    boxSizing={'border-box'}
                    _hover={{
                        bg: 'blue.50',
                        color: 'blue.600'
                    }}
                    _selected={{
                        color: 'white',
                        bg: '#5d93fe',
                    }}
                >
                    Admit Card
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="result"
                    px="4"
                    py="2"
                    rounded="md"
                    fontWeight="medium"
                    transition="all 0.2s"
                    boxSizing={'border-box'}
                    _hover={{
                        bg: 'blue.50',
                        color: 'blue.600'
                    }}
                    _selected={{
                        color: 'white',
                        bg: '#5d93fe',
                    }}
                >
                    Result
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="ansKey"
                    px="4"
                    py="2"
                    rounded="md"
                    fontWeight="medium"
                    transition="all 0.2s"
                    boxSizing={'border-box'}
                    _hover={{
                        bg: 'blue.50',
                        color: 'blue.600'
                    }}
                    _selected={{
                        color: 'white',
                        bg: '#5d93fe',
                    }}
                >
                    Ans Key
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
                value="jobs"
                minH={'300px'}
                p="4"
                bg="white"
                rounded="md"
                mt="4"
                shadow="sm"
            >
                <JobsPage />
            </Tabs.Content>
            <Tabs.Content
                value="admit"
                minH={'300px'}
                p="4"
                bg="white"
                rounded="md"
                mt="4"
                shadow="sm"
            >
                Manage your projects
            </Tabs.Content>
            <Tabs.Content
                value="result"
                minH={'300px'}
                p="4"
                bg="white"
                rounded="md"
                mt="4"
                shadow="sm"
            >
                Manage your tasks for freelancers
            </Tabs.Content>
            <Tabs.Content
                value="ansKey"
                minH={'300px'}
                p="4"
                bg="white"
                rounded="md"
                mt="4"
                shadow="sm"
            >
                Manage your tasks for freelancers
            </Tabs.Content>
        </Tabs.Root>
    )
}
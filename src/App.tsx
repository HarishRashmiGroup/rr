// import FullScreenLoader from "./components/CommingSoon"
import { Box } from "@chakra-ui/react"
import Footer from "./components/Footer"
import { Navbar } from "./components/Navbar"
import Home from "./screens/Home"
import JodITEditor from "./components/JodITEditor"
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      {/* <FullScreenLoader /> */}
      <Box width="full" p={{ base: 4, md: 8 }}>
        <JodITEditor />
      </Box>
      <Footer />
    </div>
  )
}

export default App 
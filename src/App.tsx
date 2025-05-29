import FullScreenLoader from "./components/CommingSoon"
import Footer from "./components/Footer"
import { Navbar } from "./components/Navbar"
import Home from "./screens/Home"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <FullScreenLoader />
      <Footer />
    </div>
  )
}

export default App 
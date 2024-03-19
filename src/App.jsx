import Navbar from "./Components/Navbar"
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Allappointment from "./Pages/Allappointment"
import Addappointment from "./Pages/Addappointment"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}/>
          <Route path="/appointment" element={<Allappointment />}/>
          <Route path="/appointment/add" element={<Addappointment />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
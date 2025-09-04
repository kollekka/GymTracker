import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import Exercises from './Exercises.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

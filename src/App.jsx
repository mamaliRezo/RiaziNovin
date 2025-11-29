import { useState } from 'react'
import './App.css'
import Login from './Pages/Login.jsx'
import OTP from './Pages/OTP.jsx'
import SignUp from "./Pages/SignUp.jsx"
import PasswordIN from './Pages/passwordIN.jsx'
import StudentDashboard from './Pages/StudentDash.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <Login/>
    // <OTP/>
    // <SignUp/>
    // <PasswordIN/>
    <StudentDashboard/>

  )
}

export default App
import axios from "axios"
import { useEffect } from "react"
import Register from "./pages/Register"
import Login from './pages/Login'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <div  className='font-nunito'>
        <Routes>
        <Route path="/login" index element={<Login/>}/>
        <Route path="/register" index element={<Register/>}/>


        <Route path="/" element={<Home/>} />
        </Routes>

        <ToastContainer />
    </div>
  )
}

export default App

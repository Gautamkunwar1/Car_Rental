import { useState } from "react"
import Navbar from "./components/Navbar"
import {Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import CarDetail from "./pages/CarDetail"
import Cars from "./pages/Cars"
import MyBookings from "./pages/MyBookings"
import Footer from "./components/Footer"

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const isAdminPath = useLocation().pathname.startsWith('/admin')
  return (
    <>
      {!isAdminPath && <Navbar setShowLogin={setShowLogin}/>}

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/car-details/:id" element={<CarDetail/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
      </Routes>
      {!isAdminPath && <Footer/>}
      </>
  )
}

export default App
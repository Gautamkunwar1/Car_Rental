import Navbar from "./components/Navbar"
import {Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import CarDetail from "./pages/CarDetail"
import Cars from "./pages/Cars"
import MyBookings from "./pages/MyBookings"
import Footer from "./components/Footer"
import Layout from "./pages/Admin/Layout"
import Dashboard from "./pages/Admin/Dashboard"
import AddCar from "./pages/Admin/AddCar"
import ManageCars from "./pages/Admin/ManageCars"
import ManageBooking from "./pages/Admin/ManageBooking"
import Login from "./components/LOgin";
import { Toaster } from "react-hot-toast";
import {  useAppContext } from "./context/AppContext"

const App = () => {
  const {showLogin} = useAppContext();
  const isAdminPath = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster/>
      {showLogin && <Login/> }  
      {!isAdminPath && <Navbar/>}
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/car-details/:id" element={<CarDetail/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>

        <Route path="/admin" element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="add-car" element={<AddCar/>}/>
        <Route path="manage-cars" element={<ManageCars/>}/>
        <Route path="manage-bookings" element={<ManageBooking/>}/>
        </Route>
      </Routes>
      {!isAdminPath && <Footer/>}
      </>
  )
}

export default App
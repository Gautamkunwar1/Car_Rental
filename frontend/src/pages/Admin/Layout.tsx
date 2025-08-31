import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import Sidebar from "../../components/Admin/Sidebar"
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='flex flex-col'>
            <AdminNavbar/>
            <div className='flex'>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout

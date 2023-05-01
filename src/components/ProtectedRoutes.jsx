import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loggedInStatus } from '../store/slices/authSlice'

function ProtectedRoutes() {
 const isLoggedIn = useSelector(loggedInStatus);
    
  return (
   isLoggedIn?<Outlet/>:<Navigate to="/login"  replace={true}/>
  )
}

export default ProtectedRoutes
//import "./App.css"
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./auth.jsx"
import { Login } from "../pages/Login.jsx"
import { Register } from '../pages/Register.jsx'
import { Home } from '../pages/Home.jsx'
import { UserServiceRequests } from "./UserServiceRequests.jsx"
import { ServiceRequestDetail } from './ServiceRequestDetail.jsx'


export const ApplicationViews = () => {

  
    return <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route element={<Authorized/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/service-requests" element={<UserServiceRequests/>}/>
            <Route path="/service-requests">
                <Route index element={<UserServiceRequests/>}/>
                <Route path=":serviceTicketId" element={<ServiceRequestDetail/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
   }
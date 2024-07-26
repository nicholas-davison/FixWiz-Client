//import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./auth.jsx"
import { Login } from "../pages/Login.jsx"
import { Register } from '../pages/Register.jsx'
import { Home } from '../pages/Home.jsx'
import { UserServiceRequests } from "./UserServiceRequests.jsx"
import { ServiceRequestDetail } from './ServiceRequestDetail.jsx'
import { ServiceRequestForm } from './ServiceRequestForm.jsx'
import { Profile } from './Profile.jsx'
import { AllServiceRequests } from './AllServiceRequests.jsx'


export const ApplicationViews = () => {
  

    return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route element={<Authorized />}>
          <Route path="/" element={<Home />} />
          <Route path="/service-requests" element={<AllServiceRequests/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/service-requests" element={<UserServiceRequests />} />
          <Route path="/profile/closed-service-requests" element={<UserServiceRequests closed={true}/>} />
          <Route path="/service-requests/new" element={<ServiceRequestForm />} />
          <Route path="/service-requests/:serviceTicketId" element={<ServiceRequestDetail />} />
          <Route path="/service-requests/:serviceTicketId/edit" element={<ServiceRequestForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
   }
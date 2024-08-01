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
import { getCurrentUser } from "../services/UserService"
import { useState } from "react"
import { EditProfile } from "./EditProfile.jsx"
import NotificationFetcher from "./NotificationModal.jsx"


export const ApplicationViews = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [shouldPoll, setShouldPoll] = useState(false);
  const [currentUser, setCurrentUser] = useState({})

  const handleLogout = () => {
    localStorage.removeItem("fix_token")
    localStorage.removeItem("user_type")
    setShouldPoll(false);
    setNotifications([]);
    setShowModal(false);
  }
  
  const getAndSetCurrentUser = async () => {
     await getCurrentUser().then((res) => {setCurrentUser(res)})
  }



    return (
    <BrowserRouter>
    <NotificationFetcher 
      notifications={notifications} 
      setNotifications={setNotifications} 
      showModal={showModal} 
      setShowModal={setShowModal} 
      shouldPoll={shouldPoll} 
      setShouldPoll={setShouldPoll}
      />
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route element={<Authorized handleLogout={handleLogout}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/service-requests" element={<AllServiceRequests/>} />
          <Route path="/profile" element={<Profile currentUser={currentUser} getAndSetCurrentUser={getAndSetCurrentUser}/>} />
          <Route path="/profile/edit" element={<EditProfile currentUser={currentUser} getAndSetCurrentUser={getAndSetCurrentUser}/>} />
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
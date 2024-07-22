import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./nav.jsx"
import './auth.css' 

export const Authorized = () => {
  if (localStorage.getItem("fix_token")) {
    return (
    <div className="container">
      <NavBar />
        <div>
        <Outlet className="container"/>
        </div>
    </div>
    )
  }
  return <Navigate to='/login' replace />
}

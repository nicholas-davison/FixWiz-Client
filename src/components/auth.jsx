import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./nav.jsx"

export const Authorized = ({handleLogout}) => {
  if (localStorage.getItem("fix_token")) {
    return (
    <div className="container">
      <NavBar handleLogout={handleLogout}/>
        <div>
        <Outlet className="container"/>
        </div>
    </div>
    )
  }
  return <Navigate to='/login' replace />
}

import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="flex flex-col border-t-8 border-red-600">
            {
                (JSON.parse(localStorage.getItem("user_type")) === "customer") ?
                    <li>
                        <NavLink to={"/profile/service-requests"}>My Service Requests</NavLink>
                    </li> :
                    <li >
                        <NavLink to={"/profile"}>All Service Requests</NavLink>
                    </li>

            }
            <li>
                <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            {
                (localStorage.getItem("fix_token") !== null) ?
                    <li >
                        <button 
                            onClick={() => {
                                localStorage.removeItem("fix_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li >
                            <NavLink to={"/login"}>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        
        </ul>
    )
}
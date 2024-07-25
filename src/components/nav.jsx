import { NavLink, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">FixWiz</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            (JSON.parse(localStorage.getItem("user_type")) === "customer") ?
                            <>
                                <Nav.Link href="/profile/service-requests">My Service Requests</Nav.Link>
                                <Nav.Link href="/service-requests/new">New Service Request</Nav.Link>
                            </> :
                            <>
                                <Nav.Link href="/service-requests">All Service Requests</Nav.Link>
                                <Nav.Link href="/profile/service-requests">My Jobs</Nav.Link>    
                            </>                  
                        }
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="" onClick={() => {localStorage.removeItem("fix_token")
                                                            navigate('/login')
                                                            }}>Logout</Nav.Link>
                    </Nav>                                                      
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

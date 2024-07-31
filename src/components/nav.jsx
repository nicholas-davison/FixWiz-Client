import { NavLink, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from "react-bootstrap";

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand 
                    style={{
                        fontFamily: "'Fugaz One', sans-serif",
                        fontWeight: 400,
                        fontStyle: 'normal'
                        }} 
                    href="/">FixWiz
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            (JSON.parse(localStorage.getItem("user_type")) === "customer") ?
                            <>
                                <NavDropdown title="My Service Requests" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile/service-requests">Open</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile/closed-service-requests">Closed</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/service-requests/new">New Service Request</Nav.Link>
                            </> :
                            <>
                                <Nav.Link href="/service-requests">Open Service Requests</Nav.Link>
                                <NavDropdown title="My Jobs" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/profile/service-requests">In Progress</NavDropdown.Item>    
                                    <NavDropdown.Item href="/profile/closed-service-requests">Closed</NavDropdown.Item>
                                </NavDropdown>
                            </>                  
                        }
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="" onClick={() => {
                            localStorage.removeItem("fix_token")
                            localStorage.removeItem("user_type")
                            navigate('/login')
                            }}>Logout</Nav.Link>
                    </Nav>                                                      
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

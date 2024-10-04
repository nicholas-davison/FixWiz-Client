import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap"
import "./intro.css"

export const Register = () => {
    const [email, setEmail] = useState("admina@straytor.com")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [isContractor, setIsContractor] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/register`, {
            method: "POST",
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "first_name": firstName,
                "last_name": lastName,
                "phone_number": phoneNumber,
                "address": address,
                "is_contractor": isContractor
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                
                if (authInfo && authInfo.token) {
                    localStorage.setItem("fix_token", JSON.stringify(authInfo))
                    localStorage.setItem("user_type", JSON.stringify(authInfo.user_type))
                    navigate("/")
                } else {
                    showModal(true)
                }
            })
    }

    return (
        <Container className="container--bordered mt-5">
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User does not exist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>

            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form className="form--login" onSubmit={handleRegister}>
                        <h1 className="text-4xl mt-7 mb-3 text-center">FixWiz</h1>
                        <h2 className="text-xl mb-10 text-center">Register new account</h2>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="firstName">First name</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="firstName"
                                value={firstName}
                                onChange={evt => setFirstName(evt.target.value)}
                                placeholder="First Name"
                                required 
                                autoFocus 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="lastName">Last name</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="lastName"
                                value={lastName}
                                onChange={evt => setLastName(evt.target.value)}
                                placeholder="Last Name"
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="username"
                                value={username}
                                onChange={evt => setUsername(evt.target.value)}
                                placeholder="Username"
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="inputPassword">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                id="inputPassword"
                                value={password}
                                onChange={evt => setPassword(evt.target.value)}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={evt => setPhoneNumber(evt.target.value)}
                                placeholder="Phone Number"
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="address"
                                value={address}
                                onChange={evt => setAddress(evt.target.value)}
                                placeholder="Address"
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                id="inputEmail"
                                value={email}
                                onChange={evt => setEmail(evt.target.value)}
                                placeholder="Email address"
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Check 
                                type="checkbox" 
                                id="selectContractor"
                                label="Are you a contractor?"
                                checked={isContractor}
                                onChange={evt => setIsContractor(evt.target.checked)}
                                style={{ marginLeft: '10px' }}
                            />
                        </Form.Group>
                        <Form.Group className="center-button">
                            <Button type="submit" className="button p-3 rounded-md bg-blue-800 text-blue-100">
                                Register
                            </Button>
                        </Form.Group>
                    </Form>
                    <div className="center-button loginLinks mt-3">
                        <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/login">
                            Already have an account?
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap"
import "./intro.css"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/login`, {
            method: "POST",
            body: JSON.stringify({ "username": username, "password": password }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(authInfo => {
                if (authInfo.token) {
                    localStorage.setItem("fix_token", JSON.stringify(authInfo))
                    localStorage.setItem("user_type", JSON.stringify(authInfo.user_type))
                    navigate("/")
                } else {
                    setShowModal(true)
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
                    <Form className="form--login" onSubmit={handleLogin}>
                        <h1 className="text-4xl mt-7 mb-3">FixWiz</h1>
                        <h2 className="text-xl mb-10">Please sign in</h2>
                        <Form.Group className="mb-4">
                            <Form.Label htmlFor="inputUsername">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="inputUsername"
                                value={username}
                                onChange={evt => setUsername(evt.target.value)}
                                placeholder="Username"
                                required 
                                autoFocus 
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
                        <Button type="submit" className="button p-3 rounded-md bg-blue-800 text-blue-100">
                            Sign in
                        </Button>
                    </Form>
                    <div className="loginLinks mt-3">
                        <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/register">
                            Not a member yet?
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

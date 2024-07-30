import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { saveUserProfileChanges } from "../services/UserService"

export const EditProfile = ({currentUser, getAndSetCurrentUser}) => {
    const [updatedProfileInfo, setUpdatedProfileInfo] = useState(
            {
                username: currentUser.user.username, 
                email: currentUser.user.email, 
                first_name: currentUser.user.first_name, 
                last_name: currentUser.user.last_name, 
                phone_number: currentUser.phone_number,
                address: currentUser.address
            })
    const navigate = useNavigate()
    const handleChange = (event) => {
        const profileCopy = {...updatedProfileInfo}
        profileCopy[event.target.name] = event.target.value
        setUpdatedProfileInfo(profileCopy)
    }

    const handleSaveUserChanges = async (event) => {
        event.preventDefault()
        await saveUserProfileChanges(updatedProfileInfo, currentUser.id).then(() => {
            getAndSetCurrentUser()
            navigate("/profile")
        })
    }
    return (
        <Form className="form-profile-edit">
            <Form.Group className="mb-3" controlId="form-profile">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="username" 
                    placeholder="Username" 
                    value={updatedProfileInfo.username} 
                    name="username"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Email" 
                    value={updatedProfileInfo.email} 
                    name="email"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile" >
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="First Name" 
                    value={updatedProfileInfo.first_name} 
                    name="first_name"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Last Name" 
                    value={updatedProfileInfo.last_name} 
                    name="last_name"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Phone Number" 
                    value={updatedProfileInfo.phone_number} 
                    name="phone_number"
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="form-profile">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Address" 
                    value={updatedProfileInfo.address} 
                    name="address"
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="success" onClick={handleSaveUserChanges}>Save</Button>
        </Form>
    )
}
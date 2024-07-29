import { useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const Profile = ({currentUser, getAndSetCurrentUser}) => {

    const navigate = useNavigate()

    useEffect(() => {
        getAndSetCurrentUser()
      },[])
    

    return (
        <>
            <Card>
                <Card.Body>Name: {currentUser.user?.first_name} {currentUser.user?.last_name}</Card.Body>
                <Card.Body>Username: {currentUser.user?.username}</Card.Body>
                <Card.Body>Email: {currentUser.user?.email}</Card.Body>
                <Card.Body>Phone Number: {currentUser.phone_number}</Card.Body>
                <Card.Body>Address: {currentUser.address}</Card.Body>
                <Card.Body>Date Joined: {currentUser.user?.date_joined}</Card.Body>
                <Button onClick={() => {navigate('/profile/edit')}}>Edit Profile</Button>
            </Card>
    
        </>
        
    )
}
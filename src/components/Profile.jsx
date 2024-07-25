import { useEffect, useState } from "react"
import { getCurrentUser } from "../services/UserService"
import { Button, Card } from "react-bootstrap"

export const Profile = () => {

    const [currentUser, setCurrentUser] = useState({})


    const getAndSetCurrentUser = async () => {
       await getCurrentUser().then((res) => {setCurrentUser(res)})
    }

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
                <Button>Edit Profile</Button>
            </Card>
    
        </>
        
    )
}
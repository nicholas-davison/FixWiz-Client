import { useNavigate, useParams } from "react-router-dom"
import { deleteServiceRequest, getServiceRequestById, updateServiceRequest } from "../services/ServiceRequestService"
import { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import "./serviceticket.css"

export const ServiceRequestDetail = () => {
    const {serviceTicketId} = useParams()
    const [currentTicket, setCurrentTicket] = useState({categories: []})
    const navigate = useNavigate()
    const [userType, setUserType] = useState("");

    useEffect(() => {
        const type = JSON.parse(localStorage.getItem("user_type"))
        setUserType(type);
    }, []);

    const getAndSetCurrentTicket = async () => {
        await getServiceRequestById(serviceTicketId).then(res => {
            setCurrentTicket(res)
        })
    }

    useEffect(() => {
        getAndSetCurrentTicket()
    }, [])

    const handleDeleteRequest = () => {
        deleteServiceRequest(serviceTicketId).then(() => {
            navigate('/profile/service-requests')
        })
    }

    const handleClaimTicket = (claim) => {
        claim ? (
            updateServiceRequest(serviceTicketId, {"contractor": userType, "date_claimed": null})
            ) : (
                updateServiceRequest(serviceTicketId, {"remove_contractor": "", "date_unclaimed": null})
        )
            navigate('/profile/service-requests')
        
    }



    return (
        <div>
            <Card className="ticket-detail-container">
                <Card.Header className="header-container" as="h5">
                    <span>Service Request # {serviceTicketId}</span>
                    <span>Urgency: {currentTicket.urgency_level}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{currentTicket.title}</Card.Title>
                    <Card.Text>{currentTicket.description}</Card.Text>
                    Categories:
                    <Card.Text >
                    {currentTicket.categories.map(cat => cat.name).join(', ')}</Card.Text>
                <Card.Footer >
                {
                userType === "customer" ? (
                    <>
                        <Button variant="warning" onClick={() => navigate("edit")}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleDeleteRequest}>Delete</Button>
                    </>
                ) : (
                    currentTicket.contractor ? (
                        <>
                        <Button variant="warning" onClick={() => {handleClaimTicket(false)}}>Unclaim</Button>{' '}
                        <Button variant="success" >Mark Complete</Button>
                        </>

                    ) : (
                        <Button variant="warning" onClick={() => {handleClaimTicket(true)}}>Claim</Button>
                    )                   
                )
            }
                    
                </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    )
}

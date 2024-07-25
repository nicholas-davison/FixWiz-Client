import { useNavigate, useParams } from "react-router-dom"
import { deleteServiceRequest, getServiceRequestById } from "../services/ServiceRequestService"
import { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import "./serviceticket.css"

export const ServiceRequestDetail = () => {
    const {serviceTicketId} = useParams()
    const [currentTicket, setCurrentTicket] = useState({categories: []})
    const navigate = useNavigate()

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

    return (
        <div>
            <Card className="ticket-detail-container">
                <Card.Header as="h5"> Service Request # {serviceTicketId} Urgency: {currentTicket.urgency_level}</Card.Header>
                <Card.Body>
                    <Card.Title>{currentTicket.title}</Card.Title>
                    <Card.Text>{currentTicket.description}</Card.Text>
                    Categories:
                    <Card.Text >
                    {currentTicket.categories.map(cat => cat.name).join(', ')}</Card.Text>
                <Card.Footer >
                    <Button variant="warning" onClick={() => navigate("edit")}>Edit</Button>{' '}
                    <Button variant="danger" onClick={handleDeleteRequest}>Delete</Button>
                </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    )
}

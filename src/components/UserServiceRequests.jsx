import { useEffect, useState } from "react"
import { getUserServiceRequests } from "../services/ServiceRequestService"
import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"

export const UserServiceRequests = () => {
    const navigate = useNavigate()
    const [serviceRequests, setServiceRequests] = useState([])

    const getAndSetServiceRequests = () => {
        getUserServiceRequests().then((res) => {
            setServiceRequests(res)
        })
    }

    useEffect(() => {
        getAndSetServiceRequests()
    }, [])



    return (
        <>
            <h1>My Service Tickets</h1>
            <div>
                {serviceRequests.map((ticket) => {

                    return (
                            <Card 
                                key={ticket.id} 
                                border="primary" 
                                style={{ width: '75%', borderWidth: '1.5px', cursor: 'pointer', marginBottom: '20px' }}
                                onClick={() => navigate(`/service-requests/${ticket.id}`)}
                            >
                                <Card.Header>Service Request #: {ticket.id}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Primary Card Title</Card.Title>
                                    <Card.Text>
                                        Date Created: {ticket.date_created}
                                    </Card.Text>
                                    <Card.Text>
                                        Urgency Level: {ticket.urgency_level}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    )
                })}
            </div>
        </>
    )
}

// <div key={waterfallObj.id} onClick={() => navigate(`/${waterfallObj.id}`)} style={{ cursor: 'pointer' }}></div>
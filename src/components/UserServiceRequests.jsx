import { useEffect, useState } from "react"
import { getUserServiceRequests } from "../services/ServiceRequestService"
import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import "./serviceticket.css"

export const UserServiceRequests = () => {
    const navigate = useNavigate()
    const [serviceRequests, setServiceRequests] = useState([])
    const userType = localStorage.getItem("user_type")

    const getBorderColor = (urgencyLevel) => {
        switch (urgencyLevel) {
            case 'high':
                return 'danger';
            case 'medium':
                return 'warning';
            case 'low':
                return 'success';
        }
    }


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
        {userType === "customer" ? (
            <h1>My Service Tickets</h1>
        ) : (
            <h1>My Open Jobs</h1>
        )
        }
            <div className="ticket-container">
                {serviceRequests.map((ticket) => {

                    return (
                            <Card 
                                key={ticket.id} 
                                border={getBorderColor(ticket.urgency_level)}
                                style={{ width: '75%', borderWidth: '1.75px', cursor: 'pointer', marginTop: '20px' }}
                                onClick={() => navigate(`/service-requests/${ticket.id}`)}
                            >
                                <Card.Header className="header-container">
                                    <span>Service Request # {ticket.id}</span>
                                    <span>Status: {ticket.status}</span>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{ticket.title}</Card.Title>
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

import { useEffect, useState } from "react"
import { getClosedUserServiceRequests, getUserServiceRequests } from "../services/ServiceRequestService"
import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import "./serviceticket.css"

export const UserServiceRequests = ({closed}) => {
    const navigate = useNavigate()
    const [serviceRequests, setServiceRequests] = useState([])
    const [userType, setUserType] = useState("")

    useEffect(() => {
        const type = JSON.parse(localStorage.getItem("user_type"))
        setUserType(type);
    }, [])



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
        !closed ? (
            getUserServiceRequests().then((res) => {
                setServiceRequests(res)
            })
        ) : (
            getClosedUserServiceRequests().then((res) => {
            setServiceRequests(res)
            })
        )
    }

    useEffect(() => {
        getAndSetServiceRequests()
    }, [])



    return (
        <>
        
        {userType && (
                userType === "customer" ? (
                    closed ? (
                        <h1>My Closed Tickets</h1>
                    ) : (
                        <h1>My Service Tickets</h1>
                    )
                ) : (
                    closed ? (
                        <h1>Completed Jobs</h1>  
                    ) : (
                        <h1>My Open Jobs</h1>
                    )
                )
            )}
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

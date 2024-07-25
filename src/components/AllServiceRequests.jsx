import { useEffect, useState } from "react"
import { getAllOpenServiceRequests } from "../services/ServiceRequestService"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const AllServiceRequests = () => {
    const navigate = useNavigate()
    const [allOpenServiceRequests, setAllOpenServiceRequests] = useState([])

    const getAndSetAllOpenServiceRequests = () => {
        getAllOpenServiceRequests().then((res) => {
            setAllOpenServiceRequests(res)
        })
    }

    useEffect(() => {
        getAndSetAllOpenServiceRequests()
    }, [])
    
    return (
        <>
            <div className="ticket-container">
                {allOpenServiceRequests.map((ticket) => {

                    return (
                            <Card 
                                key={ticket.id} 
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
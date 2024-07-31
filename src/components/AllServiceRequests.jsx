import { useEffect, useState } from "react"
import { getAllOpenServiceRequests } from "../services/ServiceRequestService"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FilterBar } from "./FilterBar"
import './serviceticket.css'

export const AllServiceRequests = () => {
    const navigate = useNavigate()
    const [allOpenServiceRequests, setAllOpenServiceRequests] = useState([])
    const [filteredRequests, setFilteredRequests] = useState([])

    const getAndSetAllOpenServiceRequests = () => {
        getAllOpenServiceRequests().then((res) => {
            setAllOpenServiceRequests(res)
            setFilteredRequests(res)
        })
    }

    useEffect(() => {
        getAndSetAllOpenServiceRequests()
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


    const handleFilter = (category, searchText) => {
        let filtered = allOpenServiceRequests
        
        if (category) {
            filtered = filtered.filter((ticket) => ticket.categories.some((cat) => cat.name === category))
        }

        if (searchText) {
            filtered = filtered.filter((ticket) =>
                ticket.title.toLowerCase().includes(searchText.toLowerCase())
            )
        }

        setFilteredRequests(filtered)
    }

    const categories = [
        ...new Set(
            allOpenServiceRequests.flatMap((ticket) =>
                ticket.categories.map((cat) => cat.name)
            )
        )
    ]
    
    return (
        <>
            <FilterBar categories={categories} onFilter={handleFilter}/>
            <div className="ticket-container">
                {filteredRequests.map((ticket) => {

                    return (
                            <Card 
                                key={ticket.id}
                                border={getBorderColor(ticket.urgency_level)}
                                style={{ borderWidth: '2.5px' }}
                                className="card-list-item"
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
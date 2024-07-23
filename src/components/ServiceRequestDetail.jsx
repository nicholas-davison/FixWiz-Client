import { useNavigate, useParams } from "react-router-dom"
import { deleteServiceRequest, getServiceRequestById } from "../services/ServiceRequestService"
import { useEffect, useState } from "react"

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
            <h1> Service Request # {serviceTicketId}</h1>
            <h2>Urgency: {currentTicket.urgency_level}</h2>
            <div>
                Categories:
                <ul>
                   {currentTicket.categories.map((cat) => {
                    return <li key={cat.id}>{cat.name}</li>
                    })}
                </ul>
            </div>
            <div>
                Description:
                <p>{currentTicket.description}</p>
            </div>
            <button>Edit</button>
            <button onClick={handleDeleteRequest}>Delete</button>
        </div>
    )
}
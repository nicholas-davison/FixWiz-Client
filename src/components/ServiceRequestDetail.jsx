import { useParams } from "react-router-dom"
import { getServiceRequestById } from "../services/ServiceRequestService"
import { useEffect, useState } from "react"

export const ServiceRequestDetail = () => {
    const {serviceTicketId} = useParams()
    const [currentTicket, setCurrentTicket] = useState({categories: []})

    const getAndSetCurrentTicket = async () => {
        await getServiceRequestById(serviceTicketId).then(res => {
            setCurrentTicket(res)
        })
    }

    useEffect(() => {
        getAndSetCurrentTicket()
    }, [])

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
            <button>Delete</button>
        </div>
    )
}
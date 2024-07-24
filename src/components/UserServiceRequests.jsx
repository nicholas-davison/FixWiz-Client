import { useEffect, useState } from "react"
import { getUserServiceRequests } from "../services/ServiceRequestService"
import { useNavigate } from "react-router-dom"

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
                        <div className="italic" key={ticket.id}>
                            <div>Service Request #: {ticket.id}</div>
                            <div>Date Created: {ticket.date_created}</div>
                            <div>Urgency Level: {ticket.urgency_level}</div>
                            <button onClick={() => {navigate(`/service-requests/${ticket.id}`)}}>View Details</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
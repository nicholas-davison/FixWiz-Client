import { useEffect, useState } from "react"
import { getUserServiceRequests } from "../services/ServiceRequestService"

export const UserServiceRequests = () => {

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
                            <div>Date Created: {ticket.date_created}</div>
                            <div>Urgency Level: {ticket.urgency_level}</div>
                            <button>View Details</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
import { useNavigate, useParams } from "react-router-dom"
import { deleteServiceRequest, getServiceRequestById, updateServiceRequest } from "../services/ServiceRequestService"
import { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import "./serviceticket.css"
import { getContractorById } from "../services/UserService"

export const ServiceRequestDetail = () => {
    const {serviceTicketId} = useParams()
    const [currentTicket, setCurrentTicket] = useState({categories: []})
    const [contractor, setContractor] = useState()
    const navigate = useNavigate()
    const [userType, setUserType] = useState("");


    useEffect(() => {
        const type = JSON.parse(localStorage.getItem("user_type"))
        setUserType(type);
    }, []);


    const getAndSetCurrentTicket = async () => {
        await getServiceRequestById(serviceTicketId).then(res => {
            setCurrentTicket(res)
        })
    }


    useEffect(() => {
        getAndSetCurrentTicket()
    }, [])


    useEffect(() => {
        const fetchContractor = async () => {
            if (currentTicket.contractor && userType === "customer") {
                try {
                    const contractorResponse = await getContractorById(currentTicket.contractor);
                    setContractor(contractorResponse);
                } catch (error) {
                    console.error("Error fetching contractor:", error);
                }
            }
        };

        fetchContractor();
    }, [currentTicket, userType])


    const handleDeleteRequest = () => {
        deleteServiceRequest(serviceTicketId).then(() => {
            navigate('/profile/service-requests')
        })
    }


    const handleClaimTicket = (claim) => {
        claim ? (
            updateServiceRequest(serviceTicketId, {"contractor": userType, "date_claimed": null})
            ) : (
                updateServiceRequest(serviceTicketId, {"remove_contractor": "", "date_unclaimed": null})
        )
        navigate('/profile/service-requests')
    }


    const handleCompleteTicket = () => {
        updateServiceRequest(serviceTicketId, {"date_completed": null})
        navigate('/profile/service-requests')
    }


    return (
        <div>
            <Card className="ticket-detail-container">
                <Card.Header className="header-container" as="h5">
                    <span>Service Request # {serviceTicketId}</span>
                    <span>Urgency: {currentTicket.urgency_level}</span>
                </Card.Header>
                <Card.Body>
                    <Card.Title>{currentTicket.title}</Card.Title>
                    <Card.Text>{currentTicket.description}</Card.Text>
                    Categories:
                    <Card.Text >
                    {currentTicket.categories.map(cat => cat.name).join(', ')}</Card.Text>
                <Card.Footer >
                {
                userType === "customer" ? (
                    currentTicket.status === 'closed' ? (
                        "**To Reopen ticket please contact an administrator**"
                    ) : (
                    <>
                        <Button variant="warning" onClick={() => navigate("edit")}>Edit</Button>{' '}
                        <Button variant="danger" onClick={handleDeleteRequest}>Delete</Button>
                    </>
                    )
                ) : (
                    currentTicket.contractor ? (
                        currentTicket.status === 'closed' ? (
                            "**To Reopen ticket please contact an administrator**"
                        ) : (
                        <>
                        <Button variant="warning" onClick={() => {handleClaimTicket(false)}}>Unclaim</Button>{' '}
                        <Button variant="success" onClick={handleCompleteTicket}>Mark Complete</Button>
                        </>
                        )
                    ) : (
                        <Button variant="warning" onClick={() => {handleClaimTicket(true)}}>Claim</Button>
                    )                   
                )
            }
                    
                </Card.Footer>
                </Card.Body>
            </Card>
            { contractor ? (
                <Card className="mt-2 p-3">
                    <Card.Title>Contractor Details:</Card.Title>
                    <Card.Text className="header-container" >
                        <span>{contractor.user.first_name} {contractor.user.last_name}</span>
                        <span>Email: {contractor.user.email}</span>
                        <span>Phone Number: {contractor.phone_number}</span>
                    </Card.Text>
                </Card>
            ) : (
                ""
            )}
        </div>
    )
}

import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { getAllCategories } from '../services/CategoryService'
import { getServiceRequestById, saveNewServiceRequest, updateServiceRequest } from '../services/ServiceRequestService'
import { useNavigate, useParams } from 'react-router-dom'

export const ServiceRequestForm = () => {
    const [urgency, setUrgency] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [description, setDescription] = useState("")
    const { serviceTicketId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories().then(res => {
            setAllCategories(res)
        })
    }, [])

    useEffect(() => {
        if (serviceTicketId) {
            getServiceRequestById(serviceTicketId).then(existingServiceRequest => {
                setUrgency(existingServiceRequest.urgency_level)
                setDescription(existingServiceRequest.description)
                const categoryIds = existingServiceRequest.categories.map(cat => cat.id);
                setSelectedCategories(categoryIds)
                })
            }
    },[])

    const handleUrgencyChange = (event) => {
        setUrgency(event.target.value)
    }

    const handleSelectedCategoriesChange = (id) => {
        setSelectedCategories(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(catId => catId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleSaveNewServiceRequest = (event) => {
        event.preventDefault()
        const newServiceRequestObj = {
            "urgency_level": urgency,
            "description": description,
            "category_ids": selectedCategories
        }
        if (serviceTicketId) {
            updateServiceRequest(serviceTicketId, newServiceRequestObj).then(() => {
                navigate('/profile/service-requests')
            })
        }
        else {
            saveNewServiceRequest(newServiceRequestObj).then(() => {
                navigate('/profile/service-requests')
            })
        }
        
    }

    return (
        <div>
            <h1>New Service Request</h1>
            <Form>
                <Form.Group>
                    <Form.Select value={urgency} onChange={handleUrgencyChange}>
                        <option value="" >How urgent is this request?</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div> Job Type:
                        {allCategories.map((cat) => {
                            return(
                            <Form.Check 
                            type='checkbox'    
                            key={cat.id}
                            label={cat.name}
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => handleSelectedCategoriesChange(cat.id)}   
                            />)
                        })}
                    </div>
                </Form.Group>
                <Form.Group>
                    <div>
                        <Form.Label>Description of Job:</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                placeholder="Describe the issue here..." 
                                value={description}
                                name="description"
                                onChange={handleDescriptionChange}
                            />
                    </div>
                </Form.Group>    
                <button onClick={handleSaveNewServiceRequest}>Submit</button>
            </Form>
        </div>
    )
}
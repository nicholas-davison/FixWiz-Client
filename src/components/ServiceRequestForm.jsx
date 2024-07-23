import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { getAllCategories } from '../services/CategoryService'
import { saveNewServiceRequest } from '../services/ServiceRequestService'
import { useNavigate } from 'react-router-dom'

export const ServiceRequestForm = () => {
    const [urgency, setUrgency] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState(new Set())
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories().then(res => {
            setAllCategories(res)
        })
    }, [])

    const handleUrgencyChange = (event) => {
        setUrgency(event.target.value)
    }
        const handleSelectedCategoriesChange = (id) => {
            setSelectedCategories(prevSelected => {
                const newSelected = new Set(prevSelected);
                if (newSelected.has(id)) {
                    newSelected.delete(id);
                } else {
                    newSelected.add(id);
                }
                return newSelected;
            });
        };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleSaveNewServiceRequest = (event) => {
        event.preventDefault()
        const selectedCategoriesArray = Array.from(selectedCategories)
        const newServiceRequestObj = {
            "urgency_level": urgency,
            "description": description,
            "category_ids": selectedCategoriesArray
        }
        saveNewServiceRequest(newServiceRequestObj).then(() => {
            navigate('/profile/service-requests')
        })
        
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
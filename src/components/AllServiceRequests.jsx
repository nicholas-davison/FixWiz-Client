import { useEffect, useState } from "react"

export const AllServiceRequests = () => {

    const [allServiceRequests, setAllServiceRequests] = useState()

    const getAndSetAllServiceRequests = () => {
        
    }

    useEffect(() => {
        getAndSetAllServiceRequests()
    }, [])
    
    return (
        <>
        List of requests here
        </>
    )
}
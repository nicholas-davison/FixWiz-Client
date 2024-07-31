export const updateReadNotification = () => {
    return fetch(`http://localhost:8000/notifications/${pk}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
        },
        body: JSON.stringify(updatedServiceRequestObj)
    })
}
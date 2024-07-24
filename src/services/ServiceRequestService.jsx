
export const getUserServiceRequests = async () => {
  return await fetch('http://localhost:8000/profile/service_requests', {
    headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
      }
    }).then(res => res.json())
  }


export const getServiceRequestById = async (pk) => {
  return await fetch(`http://localhost:8000/service_requests/${pk}`, {
    headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
      }
    }).then(res => res.json())
  }

export const saveNewServiceRequest = async (newServiceRequestObj) => {
  return await fetch("http://localhost:8000/service_requests", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
      },
      body: JSON.stringify(newServiceRequestObj)
  })
  }
  
  export const updateServiceRequest = async (pk, updatedServiceRequestObj) => {
    return await fetch(`http://localhost:8000/service_requests/${pk}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
        },
        body: JSON.stringify(updatedServiceRequestObj)
    })
    }

export const deleteServiceRequest = async (pk) => {
  return await fetch(`http://localhost:8000/service_requests/${pk}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
    }
})
}

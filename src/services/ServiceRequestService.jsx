
export const getAllOpenServiceRequests = async () => {
  return await fetch('https://fixwiz-api-ui6w7.ondigitalocean.app/service_requests', {
    headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
      }
    }).then(res => res.json())
  }



export const getUserServiceRequests = async () => {
  return await fetch('https://fixwiz-api-ui6w7.ondigitalocean.app/profile/service_requests', {
    headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
      }
    }).then(res => res.json())
  }
  
  export const getClosedUserServiceRequests = async () => {
    return await fetch('https://fixwiz-api-ui6w7.ondigitalocean.app/profile/service_requests?status=closed', {
      headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
        }
      }).then(res => res.json())
    }


export const getServiceRequestById = async (pk) => {
  try {
    const response = await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/service_requests/${pk}`, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.status === 401) {
      window.location.href = '/profile/service-requests';
      alert('Nice Try! That"s not your ticket and you know it.')
      return null;
    }
    return await response.json()

  } catch (error) {
    console.error('Network error or unexpected error:', error)
    alert('An unexpected error occurred. Please try again later.')
    return null;
  }
}

export const saveNewServiceRequest = async (newServiceRequestObj) => {
  return await fetch("https://fixwiz-api-ui6w7.ondigitalocean.app/service_requests", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
      },
      body: JSON.stringify(newServiceRequestObj)
  })
  }
  
  export const updateServiceRequest = async (pk, updatedServiceRequestObj) => {
    return await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/service_requests/${pk}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
        },
        body: JSON.stringify(updatedServiceRequestObj)
    })
    }

export const deleteServiceRequest = async (pk) => {
  return await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/service_requests/${pk}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
    }
})
}

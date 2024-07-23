
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

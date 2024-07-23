

export const getUserServiceRequests = async () => {
  const storedAuthInfo = localStorage.getItem("fix_token");
  const authInfo = JSON.parse(storedAuthInfo);
  const token = authInfo.token
    return await fetch('http://localhost:8000/profile/service_requests', {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => res.json())
  }
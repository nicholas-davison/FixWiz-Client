
const storedAuthInfo = localStorage.getItem("fix_token");
const authInfo = JSON.parse(storedAuthInfo);
const token = authInfo.token

export const getUserServiceRequests = async () => {
    return await fetch('http://localhost:8000/profile/service_requests', {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => res.json())
  }

export const getCurrentUser = async () => {

      return await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/profile`, {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
}

export const saveUserProfileChanges = async (userObj, pk) => {
  return await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/profile/${pk}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
}

export const getContractorById = async (pk) => {
  return await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/users/${pk}`, {
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}
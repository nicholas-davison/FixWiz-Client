
export const getCurrentUser = async () => {

      return await fetch(`http://localhost:8000/profile`, {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
}

export const saveUserProfileChanges = async (userObj, pk) => {
  return await fetch(`http://localhost:8000/profile/${pk}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObj)
  })
}

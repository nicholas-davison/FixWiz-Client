
export const getCurrentUser = async () => {

      return await fetch(`http://localhost:8000/profile`, {
        headers: {
          Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
}
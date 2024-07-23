
export const getAllCategories = async () => {
    return await fetch('http://localhost:8000/categories', {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
          }
        }).then(res => res.json())
      }


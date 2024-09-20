
export const getAllCategories = async () => {
    return await fetch('https://fixwiz-api-ui6w7.ondigitalocean.app/categories', {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
          }
        }).then(res => res.json())
      }


export const createAccount = async (details, handleCurrentUser) => {
        console.log(details)
      const resp = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(details),
        withCredentials: true
      });
      const data = await resp.json();
      console.log(data);
      handleCurrentUser({
        ...data.user,
        password_digest: data.encrypted_password
    });
  };
  

export const login = async (details, handleCurrentUser) => {
    const resp = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(details),
        withCredentials: true
    })

    const data = await resp.json()

    handleCurrentUser(data)

}

export const logout = async (e, logoutCurrentUser) => {
    e.preventDefault()
    const resp = await fetch('/logout', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    })
    const data = await resp.json()

    logoutCurrentUser(data)
}

export const getCurrentUser = async (handleCurrentUser) => {
      const response = await fetch('/current-user', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true,
      });
  
      const data = await response.json();
      console.log(data);
      handleCurrentUser(data);
    }   

                
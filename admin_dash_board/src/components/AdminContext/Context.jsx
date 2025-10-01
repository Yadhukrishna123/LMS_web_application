import React, { useState } from 'react'

export const AdminContext = React.createContext()
export const Context = (props) => {
    let [auth, setAuth] = useState(false)
    const isAdminLogedIn = (isAuthenticated) => {
        console.log(isAuthenticated);
        setAuth(isAuthenticated)

    }
    return (
        <AdminContext.Provider value={{ isAdminLogedIn, auth }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default Context
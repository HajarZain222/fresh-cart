import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()
function UserContextProvider({children}) {
    const [token, setToken] =  useState(null)

    useEffect(() => {   
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    }, [])

    return (
        <>
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
        </>
    )
}

export default UserContextProvider

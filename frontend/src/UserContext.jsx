import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState('');
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, token, setToken }}>
            {children}
        </UserContext.Provider>

    )

}
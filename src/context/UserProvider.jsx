import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    return (
        <UserContext.Provider value={{ user, setUser, users, setUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;
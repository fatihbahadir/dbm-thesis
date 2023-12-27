import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const ThesisContext = createContext({});

export const ThesisProvider = ({ children }) => {
    const [theses, setTheses] = useState([]);


    return (
        <ThesisContext.Provider value={{ theses, setTheses }}>
            {children}
        </ThesisContext.Provider>
    )
}

export default ThesisContext;
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const ThesisContext = createContext({});

export const ThesisProvider = ({ children }) => {
    const [theses, setTheses] = useState([]);
    const [myTheses, setMyTheses] = useState([])


    return (
        <ThesisContext.Provider value={{ theses, setTheses, myTheses, setMyTheses }}>
            {children}
        </ThesisContext.Provider>
    )
}

export default ThesisContext;
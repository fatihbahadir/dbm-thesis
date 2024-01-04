import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const ThesisContext = createContext({});

export const ThesisProvider = ({ children }) => {
    const [theses, setTheses] = useState([]);
    const [myTheses, setMyTheses] = useState([])
    const [thesisParams, setThesisParams] = useState({
        subjects: [],
        keywords: [],
        universities: [],
        institutes: [],
        languages: [],
        types: [],
        users: [],
      });

    return (
        <ThesisContext.Provider value={{ theses, setTheses, myTheses, setMyTheses, thesisParams, setThesisParams }}>
            {children}
        </ThesisContext.Provider>
    )
}

export default ThesisContext;
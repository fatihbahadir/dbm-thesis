import { useContext } from "react";
import ThesisContext from "../context/ThesisProvider";

const useThesis = () => {
    return useContext(ThesisContext);
}

export default useThesis;
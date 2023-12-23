import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();

    const logout = async() => {
        try {
            const response = await axios.post('/api/v1/auth/logout', null, {
                headers: {
                  'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true
              });
              setAuth({});
        } 
        catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;
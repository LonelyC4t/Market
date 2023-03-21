import { Navigate } from "react-router-dom";
import { useToken } from "../../Hooks/useToken";

function PrivateRouter({ children }) {
    const { token } = useToken();
    
    return token ? children : <Navigate to={"/signin"}/>
};

export {PrivateRouter};
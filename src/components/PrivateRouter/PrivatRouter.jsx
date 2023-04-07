import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRouter({ children }) {
    
    const {authToken} = useSelector(state => state.user);
    
    return authToken ? children : <Navigate to={"/signin"}/>
    
};

export {PrivateRouter};
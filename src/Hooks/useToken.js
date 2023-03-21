import { useState } from "react";
import { useSelector } from "react-redux";

function useToken() {
    const {authToken} = useSelector(state=>state.user)
    const getToken = () => {
        const token = authToken;
        
        return token;
    };
    

    const [token] = useState(getToken());

    // const saveToken = (ourToken) => {
        
    //     setToken(token)

    //     return localStorage.setItem("authToken", ourToken);
    // }

    // const deleteToken = () => {
    //     setToken(undefined);

    //     return localStorage.removeItem("authToken");
    // }

    return {token};
};

export {useToken};
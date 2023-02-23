import { useState } from "react";

function useToken() {

    const getToken = () => {
        const token = localStorage.getItem("authToken");
        
        return token;
    };
    

    const [token, setToken] = useState(getToken());

    const saveToken = (ourToken) => {
        
        setToken(token)

        return localStorage.setItem("authToken", ourToken);
    }

    const deleteToken = () => {
        setToken(undefined);

        return localStorage.removeItem("authToken");
    }

    return {token, saveToken, deleteToken};
};

export {useToken};
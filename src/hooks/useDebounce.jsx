import { useEffect, useState } from "react"


export const useDebounce = (value, tm = 5000) => {
    const [debounce, setDebounce] = useState(value);

    useEffect(()=>{
        const timouteId = setTimeout(()=>{
            setDebounce(value)
        }, tm)
        
        return ()=> {
            clearTimeout(timouteId)
        }

    }, [tm, value])


    return debounce;
}
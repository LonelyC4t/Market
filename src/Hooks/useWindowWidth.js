import { useState, useEffect } from "react"

let useWindowWidth = () => {

    let [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {

        let handleResize = () => {
            return setWindowWidth(window.innerWidth)
        };

        handleResize();
        window.addEventListener("resize", handleResize);

     return () => window.removeEventListener("resize", handleResize);

    }, []);

    return windowWidth
};

export {useWindowWidth};


import {useNavigate} from "react-router-dom";
import header from "./Header.module.css";


function MobileHeader () {
    const navigate = useNavigate()
    return (
        <div className={header.upContainer}>
            <div className={header.item}>
                
                <div className="stringSearch">
                    <input className={header.placeSearch}></input>
                </div>
                <div className={header.buttonContainer}>
                    <div onClick={()=>navigate("products")} className={header.headerButton} >PP</div>
                    <div onClick={()=>navigate("me")} className={header.headerButton} >LK</div>
                    <button onClick={()=>navigate("signin")}>signin</button>
                </div>
            </div>
        </div>
    )
};

export {MobileHeader};
import {useNavigate, NavLink} from "react-router-dom";
import style from "./header.module.css";


function MobileHeader () {
    const navigate = useNavigate();
    function signOut() {
        localStorage.removeItem("authToken");
        navigate("signin");
        return;
    };

    return (
        <div className={style.upContainer}>
            <div className={style.item}>
                
                <div className="stringSearch">
                    <input className={style.placeSearch}></input>
                </div>
                <div className={style.buttonContainer}>
                <nav className={style.buttonContainer}>
                        <NavLink className={({isActive}) => isActive ? style.headerButtonActive : style.headerButton} to={"products"}>Product</NavLink>
                        <NavLink className={({isActive}) => isActive ? style.headerButtonActive : style.headerButton} to={"me"}>User</NavLink>
                        
                        <div>
                            <button onClick={()=>navigate("signin")}>signIn</button>
                            <button onClick={()=>signOut()}>signOut</button>
                        </div>

                    </nav>
                </div>
            </div>
        </div>
    )
};

export {MobileHeader};
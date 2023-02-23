import style from "../../../style.module.css";
import logoImg from "../../../Image/logo.png";
import { NavLink, useNavigate} from "react-router-dom";


function Header () {
    const navigate = useNavigate();
    function signOut() {
        localStorage.removeItem("authToken");
        navigate("signin");
        return;
    };

    return (
        <div className={style.upContainer}>
            <div className={style.item}>
                <div className={style.itemImage}>
                    <img className={style.logoItem} alt="Котопёс" src={logoImg}></img>
                    <h3>хрючево</h3>
                </div>
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

export {Header};
import style from "../../../style.module.css";
import logoImg from "../../../Image/logo.png";
import {useNavigate} from "react-router-dom";


function Header () {
    const navigate = useNavigate()
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
                    <div className={style.headerButton} >PP</div>
                    <div className={style.headerButton} >LK</div>
                    <div className={style.headerButton} >BT</div>
                    <button onClick={()=>navigate("signin")}>signin</button>
                </div>
            </div>
        </div>
    )
};

export {Header};
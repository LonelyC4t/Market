
import logoImg from "../../../../Image/logo.png";
import footer from "./footer.module.css";

function MobileFooter () {
    return (
        <div className={footer.footerContainer}>
            <div className={footer.footerItem}>
                <div className={footer.itemImage}>
                    <img className={footer.logoItem} alt="Котопёс" src={logoImg} ></img>
                    <h2>Хрючево</h2>
                </div>
            </div>
        </div>
    )
}

export {MobileFooter};
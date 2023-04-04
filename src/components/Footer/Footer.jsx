import style from "./style.module.css";
import logoImg from "../../image/logo.png"
function Footer () {
    return (
        <div className={style.footerContainer}>
            <div className={style.footerItem}>
                <div className={style.itemImage}>
                    <img className={style.logoItem} alt="Котопёс" src={logoImg} ></img>
                    <h2>Хрючево</h2>
                </div>
                <div className={style.links} >
                    <div className={style.leftLinks}>
                        <p className={style.footerLink} >Каталог</p>
                        <p className={style.footerLink} >Акции</p>
                        <p className={style.footerLink} >Новости</p>
                        <p className={style.footerLink} >Отзывы</p>
                    </div>
                    <div className={style.rightLinks}>
                        <p className={style.footerLink} >Оплата и доставка</p>
                        <p className={style.footerLink} >Часто спрашивают</p>
                        <p className={style.footerLink} >Обратная связь</p>
                        <p className={style.footerLink} >Контакты</p>
                    </div>

                </div>
                <div className="feedback" >
                    <div>Мы на связи</div>
                    <div>8-800-555-35-35</div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export {Footer};
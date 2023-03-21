import style from "../ProductPage/style.module.css";
function ProductCard({item}) {
    return (
        <div className={style.productItem}>
            <img alt = "Вообще тут должна быть картинка" className={style.imageItem} src={item.pictures}></img>
            <span className={style.nameItem}>{item.name}</span>
        </div>
    )
};

export {ProductCard};
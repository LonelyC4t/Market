import { useDispatch } from "react-redux";
import style from "./style.module.css"
import { addItem } from "../../../redux/slice/cartSlice";

export const DetailCard = ({product}) => {
    const dispatch = useDispatch();

    console.log(product);
    return (
        <div className={style.container}>
            <h4>{product.name}</h4>
            <div className={style.descriptionWrapper}>
                <div className={style.imageWrapper}>
                    <img className={style.itemImg} src={product.pictures} alt={`${product.name}.jpg`} />
                </div>
                <div className={style.description}>
                    <div className={style.currentDescription}>
                        {product.description}
                    </div> 
                    <div className={style.stock}>
                       Остаток: {product.stock} штук
                    </div>
                    <div className={style.weight}>
                        Масса нетто: {product.wight}
                    </div>
                    <div className={style.price}>
                        {product.discount ? product.price - product.price * (product.discount / 100)  : product.price }₽
                    </div>
                    <div className={style.wrapperButton}>
                        
                        <div className={style.cartButton} onClick={()=>dispatch(addItem(product._id))}> В корзину </div>

                    </div>
                </div>
            </div>
            <div >
                {product.reviews.map((item, index)=>{
                    return <div key = {index} className={style.feedbackWrapper}>
                        <div className={style.feedback}>
                            <div className={style.avatar}>АВА</div>
                            <p className={style.message}>{item.text}</p>
                            <p className={style.rate}>{item.rating}</p>
                        </div>

                    </div>
                })}
            </div>
        </div>
    )
}
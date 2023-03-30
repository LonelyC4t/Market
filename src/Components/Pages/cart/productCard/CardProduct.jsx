import { useDispatch } from "react-redux";
import { changeChek, deсrementCount, incrementCount, removeItem } from "../../../../redux/slice/cartSlice";
import style from "./style.module.css";

export const CardProduct = ({product:{name, price, discount, _id, stock, pictures, description, count, isCheked}}) => {
    
    const dispatch = useDispatch()
    
    return (
        <>
        <div className={style.container} key = {_id}>
            <img className={style.imageCart} src={pictures} alt="Где ?" />
            <div className={style.descriptionCard}>
                <div className={style.priceContainer}>
                    <div className={style.cartName}> {name} </div>
                    <div className={style.cartName} title ={description}> {description} </div>
                    <div className={style.priceCart}>
                        { discount !== 0 ? <span className={style.nameItemDiscount}>{price} ₽</span> : <span className={style.nameItem}>{price} ₽</span>}

                        { discount !== 0 ? <span className={style.nameItem}> Скидка {discount} %</span> : null}

                        { discount !== 0 ? <span className={style.nameItem}> {price-price/100*discount} ₽</span> : null}
                        
                    </div>
                    <div className={style.countContainer}>
                        <button onClick={()=>dispatch(deсrementCount(_id))} className={style.handleCount}> - </button>
                        <div className={style.count}> {count} </div>
                        <button disabled={count === stock  }  onClick={()=>dispatch(incrementCount(_id))} className={style.handleCount}> + </button>
                    </div>
                </div>
                <input onChange={(event) => dispatch(changeChek({_id, isCheked: event.target.checked} ))} className={style.chekBox} checked = {isCheked} type="checkbox"></input>
                <button className={style.delButton} onClick={()=>dispatch(removeItem(_id))}>DEL</button>
            </div>
            
        </div>
        
        </>
    )
}
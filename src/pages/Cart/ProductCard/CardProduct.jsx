import { useDispatch } from "react-redux";
import { changeChek, deсrementCount, incrementCount, removeItem } from "../../../redux/slice/cartSlice";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

export const CardProduct = ({product:{name, price, discount, _id, stock, pictures, description, count, isCheked}}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    const removeItemm = (event) => {
        console.log(event);
        event.stopPropagation();
        dispatch(removeItem(_id))
    };
    const handleCount  = (event) => {
        console.log(event);
        event.stopPropagation();
        dispatch(incrementCount(_id))
    };
    
    return (
        <>
        <div onClick={() => navigate(`/products/${_id}`)} className={style.container} key = {_id}>
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
                        <button onClick={(event)=>handleCount(event)} className={style.handleCount}> - </button>
                        <div className={style.count}> {count} </div>
                        <button disabled={count === stock  }  onClick={()=>dispatch(incrementCount(_id))} className={style.handleCount}> + </button>
                    </div>
                </div>
                <input onChange={(event) => dispatch(changeChek( {_id, isCheked: event.target.checked} ))} className={style.chekBox} checked = {isCheked} type="checkbox"></input>
                <button className={style.delButton} onClick={(event)=>removeItemm(event)}>DEL</button>
            </div>
            
        </div>
        
        </>
    )
}
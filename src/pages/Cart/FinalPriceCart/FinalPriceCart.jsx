
import { totalPrice } from "../../../utils/cart";

import style from "../ProductCard/style.module.css";

export const FinalPriceCart = ({product, allProduct}) => {
    
    let allPrice = 0;
   
    const chekedProduct = product.filter((el)=>{
        allPrice += totalPrice(el.count, el.price, el.discount)
        return el.isCheked === true
    });

    
    let chekedPrice = 0;
    let cheked = 0;

    chekedProduct.forEach(el=> {
        chekedPrice += totalPrice(el.count, el.price, el.discount)
        if (el.isCheked === true) cheked = cheked + el.count
    });
    
    return (
        <div className={style.allPrice}>
            <div>
                <h3>Итого</h3>
            </div>

            <div>
                <p className={style.finalPrice}> добавлено товаров {allProduct}  на сумму {allPrice}₽ </p>
                {chekedProduct.length ? <p className={style.finalPrice}> выбрано к оплате {cheked} товаров на сумму {chekedPrice}₽</p> : null}
            </div>
            <div className={style.buyButton}>Оформить заказ</div>
        </div>
    )
};
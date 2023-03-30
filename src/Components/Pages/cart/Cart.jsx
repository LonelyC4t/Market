import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useToken } from "../../../Hooks/useToken";
import { removeAllItem } from "../../../redux/slice/cartSlice";
import { api } from "../../Api/Api";
import { CardProduct } from "./productCard/CardProduct";
import style from "../cart/productCard/style.module.css";
import emptyCart from "../../../Image/emptyCart.jpg";

import { FinalPriceCart } from "./finalPriceCart/finalPriceCart";


export const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {token} = useToken();
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getCartProducts', cart.length, token],
        queryFn: async () => {
            return await Promise.allSettled(
            cart.map(el => api.getCurrentProduct(token, el.id)
            .then(res => res.json())))
            .then(res => res.map(el => el.value))
            
        }
    });

    let allProduct = 0;
    
    for (let i = 0; i < cart.length; i++){
        if(data) {
            data[i].isCheked = cart[i].isCheked;
            data[i].count = cart[i].count;  
        }     
        allProduct = allProduct + cart[i].count;

    };
    
    if(isLoading) return <p>Загрузка</p>;
    if(isError) return <p>Что-то пошло не так</p>;
    
    return (
        <div className={style.cartContainer}>
            <h1>Корзина</h1>
            <div className={style.productWrapper}>
                {data.map((product, index) => {
                    return <CardProduct key={index} product = {product} />
                })}
                
            </div>

            {cart.length === 0 ? <div className={style.emptyCart}> 
                <p onClick={()=>navigate("/products")} className={style.emptyCartText}> В коорзине пока пусто </p>
                <img className={style.emptyCartImg} alt="В корзине пусто" src={emptyCart}></img> 
                <p onClick={()=>navigate("/products")} className={style.emptyCartText}> Срочно исправляем ситуацию.</p>
            </div> : null}

            {cart.length > 0 ? <FinalPriceCart product = {data} allProduct = {allProduct} /> : null}
            
        </div>
    );
};
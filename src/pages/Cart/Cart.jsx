import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { removeAllItem } from "../../redux/slice/cartSlice";
import { api } from "../../api/api";
import { CardProduct } from "./ProductCard/CardProduct";
import style from "../Cart/ProductCard/style.module.css";
import emptyCart from "../../image/emptyCart.jpg";
import { FinalPriceCart } from "./FinalPriceCart/FinalPriceCart";


export const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {authToken} = useSelector(state => state.user);
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['getCartProducts', cart.length, authToken],
        queryFn: async () => {
            return await Promise.allSettled(
            cart.map(el => api.getCurrentProduct(authToken, el.id)
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
    if(isError) return <p>Что-то пошло не так {error}</p>;
    
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
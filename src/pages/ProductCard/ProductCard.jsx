import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slice/cartSlice";
import style from "../ProductPage/style.module.css";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";

function ProductCard({item}) {
    const {count} = useSelector(state => state.cart);
    const [modalOpen, setModalOpen] = useState(false);

    const closeModal = () => {
        setTimeout(()=>{
            setModalOpen(false)
        },3000)
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (event) => {
        event.stopPropagation();
        dispatch(addItem(item._id));
        setModalOpen(true)
        closeModal()
    };
    
    const WithLimit = ()  => {
        
        if (item.stock >=10)
            return <div className={style.stockMany}> Осталось {item.stock} шт.</div>

        if (item.stock >= 5)
            return <div className={style.stockMidle}> Осталось {item.stock} шт.</div>

        return  <div className={style.stockLittle}> Осталось {item.stock} шт.</div>
    };

    return (
        <div  onClick={() => navigate(item._id)} className={style.productItem}>
            <img alt = "Вообще тут должна быть картинка" className={style.imageItem} src={item.pictures}></img>
            {item.discount ? <p className={style.sale}>Sale</p> : null}
            <span title={item.name} className={style.nameItem}>{item.name}</span>
            <div className={style.priceContainer}>

                { item.discount !== 0 ? <span className={style.nameItemDiscount}>{item.price} ₽</span> : <span className={style.nameItem}>{item.price} ₽</span>}
                { item.discount !== 0 ? <span className={style.nameItem}> Скидка {item.discount} %</span> : null}
                { item.discount !== 0 ? <span className={style.nameItem}> {item.price-item.price/100*item.discount} ₽</span> : null}

            </div>

            <div className={style.cartButton} onClick={(event)=>handleAddToCart(event)} > В корзину </div>
            
            { WithLimit()}
            <span>{count}</span>
            <Modal isOpen = {modalOpen} > <div className={style.addModal}>Товар добавлен в корзину</div> </Modal>
            
        </div>
    )
};

export {ProductCard};
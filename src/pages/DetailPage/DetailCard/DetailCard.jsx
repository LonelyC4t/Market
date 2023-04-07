import { useDispatch } from "react-redux";
import style from "./style.module.css"
import { addItem } from "../../../redux/slice/cartSlice";
import { addFavorite } from "../../../redux/slice/favoriteSlice";
import { useState } from "react";
import { Modal } from "../../../components/Modal/Modal";

export const DetailCard = ({product}) => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenFavor, setModalOpenFavor] = useState(false);

    const closeModal = () => {
        setTimeout(() => {
            setModalOpen(false)
        }, 3000);
    };
    const closeModalFavor = () => {
        setTimeout(() => {
            setModalOpenFavor(false)
        }, 3000);
    };

    const handleAddCart = () => {
        dispatch(addItem(product._id));
        setModalOpen(true);
        closeModal();
    };

    const handleAddFavor = () => {
        dispatch(addFavorite(product._id));
        setModalOpenFavor(true);
        closeModalFavor();
    }
    
    return (
        <div className={style.container}>
            <Modal  isOpen = {modalOpen} closeModal = {closeModal}> <div className={style.addModal}>Товар добавлен в корзину</div> </Modal>
            <Modal  isOpen = {modalOpenFavor} closeModal = {closeModal}> <div className={style.addFavor}>Товар добавлен в избранное</div> </Modal>
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
                    <div className={style.likesWrapper}> пользователей оценило: 
                        <p className={style.like}>❤</p>
                        <p className={style.likeNum}>{product.likes.length}</p>
                    </div>
                    <div className={style.wrapperButton}>
                        
                        <div className={style.cartButton} onClick={() => handleAddCart()}> В корзину </div>

                        <div className={style.cartButton} onClick={() => handleAddFavor()}> В избранное </div>

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
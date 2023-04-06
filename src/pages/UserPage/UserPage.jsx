import { useState } from "react";
import {api} from "../../api/api";
import { Modal } from "../../components/Modal/Modal";
import { FavoriteBox } from "./FavoriteBox";
import style from "./style.module.css";
import {useQuery} from '@tanstack/react-query';
import { useSelector } from "react-redux";
import { ProductForm } from "../../components/ProductForm";

function UserPage(){
    
    const favorite = useSelector(state => state.favorite)
    const {authToken} = useSelector(state => state.user);
    const [modalOpen, setModalOpen] = useState(false);

    const {data: aboutMe, isError, error} = useQuery({

        queryKey:["userFetch"],

        queryFn: async () => {
            let token = authToken;
            let responce = await api.getUser(token);
            let data = await responce.json();
            if (!responce.ok) throw new Error(data.message)

            return await data;
        },

        initialData:{}
    });

    if(isError) return <p className={style.errMsg}>Что-то пошло не так</p>;

    const closeModal = () => setModalOpen(false)

    return (
        <div className={style.userContainrt}>
            <div className={style.userItem}>
            { error ? <p className={style.errMsg}>Что-то пошло не так : {error.message} ткните F5 или зайдите позже </p> : null }
                <img className={style.userImage} src={aboutMe.avatar} alt="Ало полиция, картинки нет" />
                <div className="aboutItem">
                    <div>
                        <span>Name:</span> <span>{aboutMe.name}</span>
                    </div>
                    <div>
                        <span>Email:</span> <span>{aboutMe.email}</span>
                    </div>
                    <div>
                        <span>Хто я:</span> <span>{aboutMe.about}</span>
                    </div>
                </div>
            </div>
            {favorite.length ? <div className={style.favorContainer}>
            <h3 className={style.favorTitle}>Ваши избранные товары</h3>
                <FavoriteBox />
            </div> : null}

            <div onClick={() => setModalOpen(true)}>Добавить своё</div>
            <Modal isOpen = {modalOpen} closeModal = {closeModal}> <ProductForm/> </Modal>
        </div>
    )
};

export {UserPage}
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { api } from "../../api/api";
import { DetailCard } from "./DetailCard/DetailCard";
import style from "./DetailCard/style.module.css"

export const DetailPage = () => {
    const { authToken } = useSelector(state => state.user)
    const { idOfProduct } = useParams();

    const {data: detailProduct, isError, isLoading, error} = useQuery ({
        queryKey: ["getCurrentProduct"],
        queryFn: async () => {
            const responce = await api.getCurrentProduct(authToken, idOfProduct);
            const data = await responce.json()
            return data
        }
    })

    if(isError) return <p> Произошла ошибка {error} </p>
    if(isLoading) return <p>Загрузка</p>

    return (

        <div className={style.wrapper}> 
            <DetailCard product = {detailProduct} />
        </div>
           
    )
}
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import style from "./style.module.css"
import { useNavigate } from "react-router-dom";
import { delFavorite } from "../../redux/slice/favoriteSlice";

export const FavoriteBox = () => {
    
    const favorite = useSelector(state => state.favorite);
    const {authToken} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data:product } = useQuery({
        queryKey: ['getFavorProducts', favorite.length, authToken],
        queryFn: async () => {
            return await Promise.allSettled(
            favorite.map(el => api.getCurrentProduct(authToken, el.id)
            .then(res => res.json())))
            .then(res => res.map(el => el.value))
        },
        initialData: [{}]
    });
    
    return (
        <div className={style.favorWrapper}>
            
            {product.map((el, index)=>{
               return <div key = {index}>
                    <div>
                        <img onClick={()=>navigate(`/products/${el._id}`)} className={style.FavorImg} title={el.name} src={el.pictures} alt={el.name} />
                        <div onClick={()=>dispatch(delFavorite(el._id))} className={style.favorDel}>╳</div>
                    </div>
                </div>
            })}

        </div>
    )
};
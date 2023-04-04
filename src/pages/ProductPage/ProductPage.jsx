import style from "./style.module.css";
import {api} from "../../api/api";
import {useQuery} from '@tanstack/react-query';
import { ProductCard } from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { getFilterSelector } from "../../redux/slice/filterSlice";



function ProductPage(){
    
    const {authToken} = useSelector(state => state.user);
    const {search} = useSelector(getFilterSelector)
    

    const {data:catalog, error, isLoading} = useQuery({
        
        queryKey:["productFetch", search],

        queryFn: async () => {
            let responce = await api.getSearchProduct(search, authToken);
            let data = await responce.json();
            if(!responce.ok) throw new Error(data.message);
    
            return data
        },
        initialData:[{}]
    });

    if(isLoading) return <p>Загрузка</p>

    return (
        <div className={style.productWrapper}>
            {error ? <p className={style.errMsg}>Что-то пошло не так {error.message} обновите страницу или попробуйте позже</p>  : null }
            {catalog.length ? catalog.map((item, index)=>{
                return <div key = {index}>
                    <ProductCard item = {item} />
                </div>
            }) : <h3>По вашему запросу {search} ничего не найдено</h3>
        }
        </div>
    )
}

export {ProductPage};
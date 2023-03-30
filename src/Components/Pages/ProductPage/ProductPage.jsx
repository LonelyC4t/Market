import style from "./style.module.css";
import {api} from "../../Api/Api";
import {useQuery} from '@tanstack/react-query';
import { useToken } from "../../../Hooks/useToken";
import { ProductCard } from "../productCard/productCard";
import { useSelector } from "react-redux";
import { getFilterSelector } from "../../../redux/slice/filterSlice";



function ProductPage(){
    
    const {token} = useToken();
    const {search} = useSelector(getFilterSelector)
    
   
    // const {data:catalog, isError, error} = useQuery({
        
    //     queryKey:["productFetch", search],

    //     queryFn: async () => {
    //         let responce = await api.getProducts(token);
    //         let data = await responce.json();
    //         if(!responce.ok) throw new Error(data.message);
    //         console.log(search);
    //         return data
    //     },
    //     initialData:{ products : [], total : 0 }
    // });

    const {data:catalog, error, isLoading} = useQuery({
        
        queryKey:["productFetch", search],

        queryFn: async () => {
            let responce = await api.getSearchProduct(search, token);
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
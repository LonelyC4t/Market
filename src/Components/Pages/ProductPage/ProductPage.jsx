import style from "../../../style.module.css";
import {api} from "../../Api/Api";
import {useQuery} from '@tanstack/react-query';
import { useToken } from "../../../Hooks/useToken";
import { ProductCard } from "../productCard/productCard";


function ProductPage(){

    const {token} = useToken();

    const {data:catalog, isError, error} = useQuery({
        
        queryKey:["productFetch"],

        queryFn: async () => {
            let responce = await api.getProducts(token);
            let data = await responce.json();
            if(!responce.ok) throw new Error(data.message);
        
            return data
        },
        initialData:{ products : [], total : 0 }
    });
    
    return (
        <div className={style.productWrapper}>
            {error ? <p className={style.errMsg}>Что-то пошло не так {error.message} обновите страницу или попробуйте позже</p>  : null }
            {catalog && catalog.products.map((item, index)=>{
                return <div key = {index}>
                    <ProductCard item = {item} />
                </div>
            }) 
        }
        </div>
    )
}

export {ProductPage};
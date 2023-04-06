import style from "./style.module.css";
import {api} from "../../api/api";
import {useQuery} from '@tanstack/react-query';
import { ProductCard } from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { changeSorting, getFilterSelector } from "../../redux/slice/filterSlice";
import { DISCOUNT_SORT_DOWN, DISCOUNT_SORT_UP, PRICE_SORT_DOWN, PRICE_SORT_UP } from "../../utils/sort";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";


function ProductPage(){
    
    const {authToken} = useSelector(state => state.user);
    const {search, sorting} = useSelector(getFilterSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const [sortValue, setSortValue] = useState(() => {
        const firstSort = searchParams.get("sort")
        return firstSort ? firstSort : ""
    });
    
    

    const {data:catalog, error, isLoading} = useQuery({
        
        queryKey:["productFetch", search, sorting],

        queryFn: async () => {
            let responce = await api.getSearchProduct(search, authToken);
            let data = await responce.json();
            if(!responce.ok) throw new Error(data.message);
            switch (sorting) {
                
                case PRICE_SORT_UP:
                    return data.sort((a, b)=>{
                        if(a.price > b.price) return -1
                        if(a.price < b.price) return 1
                        return 0
                    })

                case PRICE_SORT_DOWN:
                    return data.sort((a, b)=>{
                        if(a.price > b.price) return 1
                        if(a.price < b.price) return -1
                        return 0
                    })

                case DISCOUNT_SORT_UP:
                    return data.sort((a, b)=>{
                        if(a.discount > b.discount) return -1
                        if(a.discount < b.discount) return 1
                        return 0
                    })

                case DISCOUNT_SORT_DOWN:
                    return data.sort((a, b)=>{
                        if(a.discount > b.discount) return 1
                        if(a.discount < b.discount) return -1
                        return 0
                    })
                    
                default:
                return data
                
            };
        },
        initialData:[{}]
    });
    
    if(isLoading) return <p>Загрузка</p>;

    const handleChangeSort = (event) => {
        setSortValue(event.target.value)
        dispatch(changeSorting(event.target.value));
        if(event.target.value !== "null")
       
        return navigate({
            pathname: "/products",
            search: `?sort=${event.target.value}`
        });
        navigate({
            pathname: "/products"
        })
    }
    
    return (
        
            
    <div className={style.productWrapper}>
        {catalog.length ? <div>
            <select className={style.selectSort} onChange={(event) => handleChangeSort(event)} value={sortValue}>
                <option value={""}>Все продукты</option>
                <option value={PRICE_SORT_UP}>Дороже</option>
                <option value={PRICE_SORT_DOWN}>Дешевле</option>
                <option value={DISCOUNT_SORT_UP}>С большой скидкой</option>
                <option value={DISCOUNT_SORT_DOWN}>Без скидки</option>
                
            </select>
        </div> : null}
        {error ? <p className={style.errMsg}>Что-то пошло не так {error.message} обновите страницу илипопробуйтепозже</p>  : null }
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
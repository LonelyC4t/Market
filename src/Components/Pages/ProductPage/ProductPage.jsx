import style from "../../../style.module.css";
import {api} from "../../Api/Api";
import {useQuery} from '@tanstack/react-query';

function ProductPage(){

    

    const {data:catalog} = useQuery({
        
        queryKey:["productFetch"],

        queryFn: async () => {
            let token = localStorage.getItem("token");
            let responce = await api.getProducts(token);

            return await responce.json();
        },
        
        initialData:{products : []}
    });
    
    return (
        <div className={style.productWrapper}>
            {catalog.products.map((item, index)=>{
                return <div key = {index}>
                    <div className={style.productItem}>
                        <img alt = "Вообще тут должна быть картинка" className={style.imageItem} src={item.pictures}></img>
                        <span className={style.nameItem}>{item.name}</span>
                    </div>
                </div>
            })
            
        }
        </div>
    )
}

export {ProductPage};
import { useState, useEffect } from "react";
import style from "../../../style.module.css";
import {api} from "../../Api/Api";

function ProductPage(){

    const [catalog, setCatalog] = useState({products : []});

    useEffect(()=>{

        async function fetchData(){
            const token = localStorage.getItem("token");
            const responce = await api.getProducts(token);
            const data = await responce.json();
            setCatalog(data);
           console.log(data)
        }
        fetchData();
        
    },[]);
    
    
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

export {ProductPage}
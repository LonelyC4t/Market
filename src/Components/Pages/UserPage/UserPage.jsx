import {api} from "../../Api/Api";
import style from "../../../style.module.css";
import {useQuery} from '@tanstack/react-query';

function UserPage(){
    
    const {data:aboutMe, isError, error} = useQuery({

        queryKey:["userFetch"],

        queryFn: async () => {
            let token = localStorage.getItem("authToken");
            let responce = await api.getUser(token);
            let data = await responce.json();
            if (!responce.ok) throw new Error(data.message)

            return await data;
        },

        initialData:{}
    });
    
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
        </div>
    )
};

export {UserPage}
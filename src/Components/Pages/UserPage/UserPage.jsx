import {api} from "../../Api/Api";
import style from "../../../style.module.css";
import {useQuery} from '@tanstack/react-query';

function UserPage(){

    
    let {data:aboutMe} = useQuery({

        queryKey:["userFetch"],

        queryFn: async () => {

            let token = localStorage.getItem("token");
            let responce = await api.getUser(token);

            return await responce.json();
        },

        initialData:{}
    });

    return (
        <div className={style.userContainrt}>
            <div className={style.userItem}>
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
import {api} from "../../Api/Api";
import style from "../../../style.module.css";
import { useEffect, useState } from "react";

function UserPage(){

    const [aboutMe, setAboutMe] = useState({});

    useEffect(() => {
        async function getInfo() {
            const token = localStorage.getItem("token");
            const responce = await api.getUser(token);
            const data = await responce.json();
            setAboutMe(data);
            console.log(data)
           
        }
        getInfo()
       
    },[])

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
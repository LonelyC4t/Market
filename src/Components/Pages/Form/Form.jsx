import { Formik, Form, Field } from 'formik';
import { Outlet, useNavigate } from 'react-router-dom';
import style from "../../../style.module.css";
import {api} from "../../Api/Api";
import {useMutation} from '@tanstack/react-query';
import {useToken} from "../../../Hooks/useToken"

function FormsIn(){
    const {saveToken} = useToken();
    const navigate = useNavigate();

    const {mutateAsync, isError, error} = useMutation({
        mutationFn: async (values) => {
            const responce = await api.authorization(values);
            let data = await responce.json();
            saveToken(data.token)
            if (!responce.ok) throw new Error (data.message);
            if(responce.ok) navigate("/products");

            return data;
        }
    });
    
    async function handleSubmit(values){
        await mutateAsync(values);
    };

    return(
        <div className={style.formPlace}>
            <p>Авторизация</p>
            { error ? <p className={style.errMsg}> {error.message} </p> : null }
            <Formik
            initialValues={{
                email: '',
                password: "",
            }}
            onSubmit={handleSubmit}
            >
            <Form>
            <div >
                <Field
                    id="email"
                    name="email"
                    placeholder="Velzevul@hell.com"
                    type="email"
                    className={style.inputModal}
                />
            </div>
            <div>
                <Field className={style.inputModal} type="password" name="password" placeholder="Password" />
            </div>

            <div className={style.buttonContainer}>
                <button className={style.buttonModal} type="submit">SignIn</button>
                <div>
                <button type='button' onClick={()=>navigate('/signup')} className={style.buttonModalReg}>Registration</button>
                </div>
            </div>
            </Form>
            </Formik> 
           
        </div>
        
    )
};
export {FormsIn};
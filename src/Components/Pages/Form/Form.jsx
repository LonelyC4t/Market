import { Formik, Form, Field } from 'formik';
import { Outlet, useNavigate } from 'react-router-dom';
import style from "../../../style.module.css";
import {api} from "../../Api/Api";
import {useMutation} from '@tanstack/react-query';

function FormsIn(){
    
    const navigate = useNavigate();

    let {mutateAsync} = useMutation({
        mutationFn: async (values) => {
            const responce = await api.authorization(values);
            let data = await responce.json()
            localStorage.setItem("token", data.token);

            return data;
        }
    })

    async function handleSubmit(values){
        await mutateAsync(values);
        navigate("/products");
    };

    return(
        <div className={style.formPlace}>
            
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
                <button type='button' onClick={()=>navigate('signup')} className={style.buttonModalReg}>Registration</button>
                </div>
            </div>
            </Form>
            </Formik> 
            <Outlet></Outlet>
        </div>
        
    )
};
export {FormsIn};
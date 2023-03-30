import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import {api} from "../../Api/Api";
import {useMutation} from '@tanstack/react-query';
// import {useToken} from "../../../Hooks/useToken";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slice/userSlice';

const SignInSchema = Yup.object().shape({
      password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

function FormsIn(){
    // const {saveToken} = useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {mutateAsync, error} = useMutation({
        mutationFn: async (values) => {
            const responce = await api.authorization(values);
            let data = await responce.json();

            dispatch(setUser({
                ...data.data,
                authToken: data.token
            }));
            
            // saveToken(data.token)
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
            validationSchema = {SignInSchema}
            onSubmit = {handleSubmit}
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
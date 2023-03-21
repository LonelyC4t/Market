import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import style from "./style.module.css";
import {api} from "../../Api/Api";
import {useMutation} from '@tanstack/react-query';
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
      password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

function FormsUp(){

    const navigate = useNavigate();

    let {mutateAsync, error} = useMutation({

        mutationFn: async (values) => {
            const responce = await api.registration(values);
            const data = await responce.json();
            if(!responce.ok) throw new Error (data.message);
            if(responce.ok) navigate("/signin");
            
            return data;
        }
    });
    
    async function handleSubmitReg(values){
        await mutateAsync(values);
        navigate("/signin");
    };

   return(
       <div className={style.formPlace}>
           <p>Регистрация</p>
            { error ? <p className={style.errMsg}> {error.message} </p> : null }
           <Formik
           initialValues={{
           email: '',
           password: "",
           }}
           onSubmit={handleSubmitReg}
           validationSchema = {SignUpSchema}
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
               <button className={style.buttonModalReg} type="submit">Registration</button>
           </div>
           </Form>
           </Formik> 
           
       </div>
       
   )
};
export {FormsUp};
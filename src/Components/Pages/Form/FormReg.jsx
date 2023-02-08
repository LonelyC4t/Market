import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import style from "../../../style.module.css";
import {api} from "../../Api/Api"


function FormsUp(){

    const navigate = useNavigate();

    async function handleSubmitReg(values){
        await api.registration(values);
        navigate("/signin");
        console.log(values)
    };

   return(
       <div className={style.formPlace}>
           
           <Formik
           initialValues={{
           email: '',
           password: "",
           }}
           onSubmit={handleSubmitReg}
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
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

export const ProductForm = () => {

    const productSchema = Yup.object().shape({
        discount: Yup.number().required('Required').default(0),
        stock: Yup.number().required('Required').default(0),
        price: Yup.number().required('Required'),
        available: Yup.boolean().default(false),
        isPublished: Yup.boolean().default(false),
        pictures: Yup.string().url('Invalid url').required('Required'),
        name: Yup.string().min(4, "минимум 4 буквы").max(60, "to long").required('Required'),
        description: Yup.string().min(10, "Мало").max(600, "to long").required('Required'),
        wight: Yup.string().max(10, "to long").required('Required'),
    });
    
    const initialValue = {
        
        discount: 0,
        stock: 1,
        price: 1,
        available: false,
        isPublished: false,
        pictures: "",
        
        // tags: [
        //     "new",
        //     "sale"
        // ],
        
        name: "",
        wight: "",
        description: ""
            
    };
    const onSubmit = (values) => {
        console.log(values);
    }
    

    return (
        <Formik initialValue = { initialValue } validationSchema={ productSchema } onSubmit={ onSubmit }>
            <Form>
                <Field
                    name="name"
                    placeholder="Название товара"
                    type="text" 
                />
                <ErrorMessage name = "name" />

                <Field
                    as = "textarea"
                    name="description"
                    placeholder="Описание"
                    type="text" 
                />
                <ErrorMessage name = "description" />

                <Field
                    name="price"
                    placeholder="Стоимость"
                    type="number"
                />
                <ErrorMessage name = "price" />

                <Field
                    name="discount"
                    placeholder="Скидка"
                    type="number" 
                />
                <ErrorMessage name = "discount" />

                <Field
                    name="stock"
                    placeholder="Остаток"
                    type="number" 
                />
                <ErrorMessage name = "stock" />

                <Field
                    name="pictures"
                    placeholder="Картинка"
                    type="text" 
                />
                <ErrorMessage name = "pictures" />

                <button>Create</button>
            </Form>
        </Formik>
    )
}
import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email:Yup.string().email().required("please enter email"),
    password:Yup.string().min(8).required('please enter password')
})
import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '../schemas';
import '../Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import Navbar from './Navbar';


const initialValues = {
    email: "",
    password: ""
}

const Login = () => {
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit:async (values) => {
            const formData = new FormData()
            formData.append('email', values.email);
            formData.append('password', values.password);

           axios.post(`http://localhost:8000/api/login`, formData)
                .then(({ data }) => {
                    localStorage.setItem('token-info', JSON.stringify(data));
                    Swal.fire({
                        icon: "success",
                        text: data.message
                    })
                    navigate('/products');
                }).catch(({ response }) => {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    })
                })
        }
    });
    return (
        <div className="container">
            <div className="form-box">
                <div className="header-form">
                    <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i></h4>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>
                            <input type="email" name='email' className="form-control" placeholder="enter email" value={values.email}
                                // onChange={(event) => {
                                //     setEmail(event.target.value)
                                //     handleChange
                                // }}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.email && touched.email ? <p className='form-errors'>{errors.email}</p> : null}
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-lock"></i></span>
                            </div>
                            <input type="password" name='password' className="form-control" placeholder="Password" value={values.password}
                                // onChange={(event) => {
                                //     setPassword(event.target.value)
                                //     handleChange
                                // }}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.password && touched.password ? <p className='form-errors'>{errors.password}</p> : null}
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block">LOGIN</button>
                        <div className="message">
                            <div><a href="#">Forgot your password</a></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
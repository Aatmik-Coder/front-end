import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const[isloggedIn, setIsLoggedIn] = useState(localStorage.getItem('token-info'));

    useEffect(() => {
        if(!isloggedIn){
            navigate('/login');
        }
    },[isloggedIn]);
    const handleLogout = () => {
        setIsLoggedIn(localStorage.removeItem('token-info'));     
     }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CRUD</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                isloggedIn ? <>
                                    <li className="nav-item">
                                        <Link to={"/"} className="nav-link" aria-current="page">Home</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' aria-current="page" to={'/product/create'}>Add Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                                    </li>
                                </> :
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link" aria-current="page">Login</Link>
                                    </li>

                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
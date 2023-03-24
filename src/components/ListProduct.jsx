import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function ListProduct() {

    const navigate = useNavigate();
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(!localStorage.getItem('token-info')){
            navigate('/login')
        }
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
            setProducts(data.products)
        })
        // setSearched(products)
    }
    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://localhost:8000/api/products/${id}`).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            fetchProducts()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    const search = async (key) => {
        key != "" ?
            await axios.get(`http://localhost:8000/api/search/${key}`).then(({ data }) => {
                setProducts(data);
            })
            : 
            await axios.get(`http://localhost:8000/api/products`).then(({ data }) => {
                setProducts(data.products);
            });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <div className="input-group mb-3 col-4">
                            <input type="text" className="form-control" placeholder="search" aria-label="Search" onChange={(event) => search(event.target.value)} />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Wishlist</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0 && (
                                            products.map((row, key) => (
                                                <tr key={key}>
                                                    <td>{row.name}</td>
                                                    <td>{row.description}</td>
                                                    <td>{row.price}</td>
                                                    <td>{row.wishlist == "1" ? "Added" : "Not added"}</td>
                                                    <td>
                                                        {
                                                            row.product_image ?
                                                                <img width="50px" src={`http://localhost:8000/assets/product_image/${row.product_image}`} /> :
                                                                "No image"
                                                        }
                                                    </td>
                                                    <td>
                                                        <Link to={`/product/edit/${row.id}`} className='btn btn-success me-2'>
                                                            Edit
                                                        </Link>
                                                        <Button variant="danger" onClick={() => deleteProduct(row.id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
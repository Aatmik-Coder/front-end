import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    Form,
    Col,
    Row,
    Button,
} from 'react-bootstrap';
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditProduct() {
    const navigate = useNavigate();

    const { id } = useParams()

    // const 
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [wishlist, setWishlist] = useState("")
    const [product_image, setProductImage] = useState(null)
    const [fetch_product_image, setFetchProductImage] = useState("")
    const [validationError, setValidationError] = useState({})

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchProduct = async () => {
        await axios.get(`http://localhost:8000/api/products/${id}`)
            .then(({ data }) => {
                // console.log(data);
                const { name, description, price, wishlist, product_image } = data[0]
                // setId(id)
                setName(name)
                setDescription(description)
                setPrice(price)
                setWishlist(wishlist)
                setProductImage(product_image)
            }).catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: "error"
                })
            })
    }

    const changeHandler = (event) => {
        setFetchProductImage(event.target.files[0]);
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        console.log(fetch_product_image);
        const formData = new FormData()
        formData.append('_method', 'PATCH');
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('wishlist', wishlist);
        if (fetch_product_image !== null) {
            formData.append('product_image', fetch_product_image);
        }

        await axios.post(`http://localhost:8000/api/products/${id}`, formData)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message
                })
                navigate("/")
            }).catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors)
                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: "error"
                    })
                }
            })
    }
    const deleteImage = async () => {
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
        await axios.post(`http://localhost:8000/api/products/edit/image/${id}`)
            .then(({ data }) => {
                Swal.fire({
                    icon: "success",
                    text: data.message
                })
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: "error"
                })
            })
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                                <Link className='btn btn-primary mb-2 float-end' to={"/"}>
                                    Back
                                </Link>
                            <h4 className="card-title">Update Product</h4>
                            <hr />
                            {/* <div className='col-12'> */}
                            {/* </div> */}
                            <div className="form-wrapper">
                                {
                                    Object.keys(validationError).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={updateProduct}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Name">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control required type="text" value={name} onChange={(event) => {
                                                    setName(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Price">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control required type="number" value={price} onChange={(event) => {
                                                    setPrice(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Wishlist">
                                                <Form.Label>WishList</Form.Label>
                                                <Form.Check required type="radio" value={1} checked={wishlist === "1"} name="wishlist" label="Add" onChange={(event) => {
                                                    setWishlist(event.target.value)
                                                }} />
                                                <Form.Check required type="radio" value={0} checked={wishlist === "0"} name="wishlist" label="Don't Add" onChange={(event) => {
                                                    setWishlist(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control required as="textarea" rows={3} value={description} onChange={(event) => {
                                                    setDescription(event.target.value)
                                                }} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Image" className="mb-3">
                                                <Form.Label>Product Image</Form.Label>
                                                {
                                                    product_image != null ?
                                                        <div>
                                                            <img width="150px" src={`http://localhost:8000/assets/product_image/${product_image}`} />
                                                            <a href="#" onClick={() => deleteImage()}><i className="fa fa-trash" aria-hidden="true"></i></a>
                                                        </div>
                                                        :
                                                        <Form.Control type="file" onChange={changeHandler} />
                                                }
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
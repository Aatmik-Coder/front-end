import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [wishlist, setWishlist] = useState("")
  const [product_image, setProductImage] = useState()
  const [validationError, setValidationError] = useState({})


  const changeHandler = (event) => {
    setProductImage(event.target.files[0]);
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('wishlist', wishlist);
    formData.append('product_image', product_image);

    await axios.post(`http://localhost:8000/api/products`, formData)
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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <Link className='btn btn-primary mb-2 float-end' to={"/products"}>
                Back
              </Link>
              <h4 className="card-title">Create Product</h4>
              <hr />
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
                <Form onSubmit={createProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) => {
                          setName(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(event) => {
                          setPrice(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Wishlist">
                        <Form.Label>WishList</Form.Label>
                        <Form.Check type="radio" value={1} name="wishlist" label="Add" onChange={(event) => {
                          setWishlist(event.target.value)
                        }} />
                        <Form.Check type="radio" value={0} name="wishlist" label="Don't Add" onChange={(event) => {
                          setWishlist(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                          setDescription(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
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
export default CreateProduct;
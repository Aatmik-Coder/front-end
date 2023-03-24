import * as React from "react";
// import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ListProduct";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token-info'));
  React.useEffect(() => {
    <Navbar login={setIsLoggedIn(isLoggedIn)}/>
  },[]);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/product/create" element={<CreateProduct/>}></Route>
        <Route path="/product/edit/:id" element={<EditProduct/>}></Route>
          
        <Route path="/products" element={<ProductList/>}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      {/* <Navbar bg="primary">
        <Container>
          {
            !login ?? <Link to={"/login"} className="text-white">Login</Link>
          }
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            {
                <Routes>
                  <Route path="/product/create" element={<CreateProduct />} />
                  <Route path="/product/edit/:id" element={<EditProduct />} />
                  <Route exact path='/products' element={<ProductList />} />
                  <Route path="*" element={<div>Page not found!</div>}/>
                  <Route path="/login" element={<Login />} />
                </Routes>
            }
          </Col>
        </Row>
      </Container> */}
    </Router>
  );
}

export default App;

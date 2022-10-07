import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Home = () => {

    const navigate = useNavigate()
    const productsList = useSelector(state => state.products)
    const [ categories, setCategories ] = useState([])
    const [ productsFiltered, setProductsFiltered ] = useState([])
    const [ searchValue, setSearchValue ] = useState("")

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
        .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productsList)
    }, [productsList])

    const filterCategory = (categoryId) => {
       const filtered = productsList.filter(product => 
        product.category.id === categoryId
        )
      setProductsFiltered(filtered)
    }

    const searchProducts = () => {
       
        const filtered = productsList.filter(
            products => products.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        setProductsFiltered(filtered)
    }

    return (
        <div>
            <h1>Home</h1>
            {
                categories.map(category => (
                    <button key={category.id} onClick={() => filterCategory(category.id)}>
                        {category.name}
                    </button>
                ))
            }

              <InputGroup className="mb-3">
                      <Button variant="outline-secondary" onClick={searchProducts}>
                        Button
                      </Button>
                      <Form.Control
                          placeholder="Search Products"
                          onChange={e => setSearchValue(e.target.value)}
                          value={searchValue}
                      />
                    </InputGroup>

            <ul>
                {productsFiltered.map(product => (
                    <li key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                        <h4>{product.title}</h4>
                        <img src={product.productImgs} alt="" width={"200px"} height={"400px"} className="imgs"/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
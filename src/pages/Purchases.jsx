import React, { useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h2>Purchases</h2>
            <ListGroup key={purchases[0]?.id}>
                {
                    purchases.map(purchase => (
                    <ListGroup.Item key={purchase.cart.id}>
                          {purchase.cart.products.map(product => (
                           <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            {product.title}</div>
                          ))}
                          
                          </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    );
};

export default Purchases;
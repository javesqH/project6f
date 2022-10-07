import React, { useEffect } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';

const CarSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
     

    useEffect(() => {
      dispatch(getCartThunk())
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ListGroup key={cart.id}>
          {cart.map(cart => (
            <ListGroup.Item key={cart.id}>
              <Link to={`/product/${cart.id}`}>
              {cart.title}
              </Link>
              </ListGroup.Item>
          ))}
        </ListGroup>
        <Button onClick={() => dispatch(purchaseCartThunk())}>
          Checkout

        </Button>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CarSidebar;
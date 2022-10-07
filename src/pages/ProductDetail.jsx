import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addPurchasesThunk } from '../store/slices/purchases.slice';

const ProductDetail = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const product_list = useSelector(state => state.products)
    const [ rate, setRate ] = useState(5)

    const product_detail = product_list.find(products => products.id === Number(id))
    const relatedProducts = product_list.filter(
        products => products.category.id === product_detail?.category.id
    )

    console.log(relatedProducts)

    useEffect(() => {
        setRate(5)
    }, [id])

    const addPurchase = () => {
        alert("Añadiendo")
        const purchase_ = {
              id: id,
              quantity: rate

        }
        dispatch(addPurchasesThunk(purchase_))
    }

    return (
        <div>
           <h2>{product_detail?.title}</h2>
           <br />
           <ul>
              {
                relatedProducts.map(products => (
                    <li key={products.id}>
                        <Link to={`/product/${products.id}`}>{products.title}</Link>
                    </li>
                ))
              }
           </ul>
           <img className='img-fluid' src={product_detail?.productImgs} alt=""   width="300px"  height="300px" />
           <br />
           <br />
           <div className='rate'>
            <Button className="me-3" onClick={() => setRate(rate-1)}>
                -
                </Button>
            {rate}
            <Button className="ms-3" onClick={() => setRate(rate+1)}>
                +
                </Button>
                <br />
                <Button onClick={addPurchase}>Add to purchases</Button>
           </div>
           <h3>$: {product_detail?.price}</h3>  
           <h3>{product_detail?.description}</h3>  
           <p>Mostrando producto con id: {id}</p>
        </div>
    );
};

export default ProductDetail;
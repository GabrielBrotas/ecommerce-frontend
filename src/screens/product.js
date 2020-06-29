import React, { useEffect, useState } from 'react'
import '../styles/product.css'
import { useSelector, useDispatch } from 'react-redux'
import { productById } from '../actions/productActions'
import { getIdFromUrl } from '../helper'

function Product(props) {

    // pegar lista de produtos
    const productItem = useSelector(state => state.productItem)
    const {loading, product, error} = productItem

    const dispatch = useDispatch()

    // quantidade para add no carrinho
    const [qty, setQty] = useState(1)
    const url = props.location.pathname
    const id = getIdFromUrl(url)
    
    // pegar pelo id
    useEffect( () => {

        dispatch(productById(id))
        
    }, [dispatch, props, id])

    // add to cart
    const AddtoCart = () => {
        props.history.push('/cart/?id=' + id + '/?qty=' + qty)
    }

    return(
        loading ? <div>Loading...</div> :
        error ? <div>Error... {error}</div> :
        
        <div className="product-main-content">

            <div className="product-info-content">

                <div className="buy-product-image">
                    <img src={product.image} alt="product"></img>
                </div>

                <div className="buy-product-details">

                    <div className="buy-product-name">
                        <h2>{product.name}</h2>
                    </div>

                    <div className="buy-product-description">
                        <p>Descrição: {product.description}</p>
                    </div>
                </div>

            </div>

            <div className="buy-product-actions">
                <h3>Add to Cart</h3>

                <div className="buy-product-qty">
                    <label htmlFor='qty'>Quantidade:</label>

                    <select name="qty" value={qty} onChange={(e) => setQty(e.target.value)}>

                        {[...Array(product.countInStock).keys()].map( count => 
                            <option key={count+1} value={count+1}> {count+1} </option>   
                        )}

                    </select>

                </div>

                <div className="buy-product-price">
                    <label htmlFor="price">Preço:</label>
                    <h4>R$ {(product.price * qty).toFixed(2)}</h4>
                </div>
                            
                {product.countInStock > 0 ? <button className="button" onClick={AddtoCart}> Add to Cart</button> 
                :   <button disabled>Out of Stock</button>
                }

            </div>
        </div>

    )
}

export default Product
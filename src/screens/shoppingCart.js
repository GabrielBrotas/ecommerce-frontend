import React, { useEffect, useState } from 'react'


import '../styles/reviewPayment.css'
import { getIdAndQtyFromUrl } from '../helper'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'

function Cart(props) {
    
    const cart = useSelector(state => state.cartList)
    const {cartItems} = cart

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    // pegear o id e a quantidade caso tenha
    const url = props.location.search
    const productId = url ? getIdAndQtyFromUrl(url)[0] : null
    const qty = url ? getIdAndQtyFromUrl(url)[1] : 1
        
    const [amount, setAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const dispatch = useDispatch()

    useEffect( () => {
        
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
        
    }, [dispatch, productId, qty])


    useEffect( () => {
        setAmount(cartItems.reduce( (accumulator, currentValue) => accumulator + currentValue.qty, 0))
        setTotalPrice((cartItems.reduce( (accumulator, currentValue) => accumulator + currentValue.price * currentValue.qty, 0)).toFixed(2))
    }, [cartItems])


    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    
    return(
  
        <div className="shoppingcart-content">
            
            <div className="list-content">
                {cartItems.length === 0 ? 'Sem itens no carrinho' : 

                    cartItems.map( item => (

                        <div key={item.product} className="list-body">
                            <div className="body-img">
                                <img src={item.image} alt="product"></img>
                            </div>

                            <div className="body-details">
                                <h3>{item.name}</h3>
                                <h4>Quantidade: {item.qty}</h4>
                            </div>

                            <div className="body-price">
                                <h3>R$ {item.price}</h3>
                            </div>

                            <div className="body-cancel-icon">
                                <img onClick={() => removeFromCartHandler(item.product)} src="/images/fechar.png" alt="delete"></img>
                            </div>
                        
                        </div>

                    ))
            }
                
            </div>

            <div className="buy-items-content">

                <h3>Finalizar Compra</h3>
                <div className="buy-items-qty">
                    <label htmlFor="qty">Qtd items:</label>
                    <h4>{amount}</h4>
                </div>

                <div className="buy-items-price">
                    <label htmlFor="qty">Preço Final: </label>
                    <h4>R${totalPrice}</h4>
                </div>
                
                

                {cartItems.length > 0 ?

                    userInfo ? 
                    // <Paypal toPay={totalPrice} amount={amount} onSuccess={transactionSuccess} transactionError={transactionError} />
                    <button onClick={() => props.history.push('/address')} className="button">Comprar!</button> 
                    :
                    <button onClick={() => props.history.push('/signin?logged=false')} className="button">Comprar!</button>
                
                : <div></div>
                }
                

            </div>

        </div>

    )
}

export default Cart
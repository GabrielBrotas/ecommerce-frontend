import React, { useEffect, useState } from 'react'
import Paypal from '../components/Paypal'
import '../styles/shoppingCart.css'
import { useDispatch, useSelector } from 'react-redux'
import { savePayment } from '../actions/cartActions'


function ReviewPayment(props) {
    
    const cart = useSelector(state => state.cartList)
    const {cartItems, addressInfo} = cart
    console.log(cartItems)
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const imageList = useSelector( state => state.imageList)
    const {loadingImages, images} = imageList

    const [amount, setAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const dispatch = useDispatch()

    useEffect( () => {
        setAmount(cartItems.reduce( (accumulator, currentValue) => accumulator + currentValue.qty, 0))
        setTotalPrice((cartItems.reduce( (accumulator, currentValue) => accumulator + currentValue.price * currentValue.qty, 0)).toFixed(2))
    }, [cartItems])


    const transactionSuccess = (payment) => {
        const { paid, paymentID } = payment
        if(paid) {
            dispatch(savePayment({email: userInfo.email, paymentID, cartItems, addressInfo}))
            props.history.push('/')
        }
    }


    const transactionError = () => {
        console.log('transaction error')
    }
    
    return(
        userInfo ? 
        loadingImages ? <div>Loading...</div>
        :
        <main className="main">
            <h3 className="main-h3">REVIEW PAYMENT</h3>
        <div className="reviewpayment-content">
            
            
            <div className="list-content">
                <h4 className='review-content-text'>ADDRESS</h4>
                <div className="addressreview-content">
                   

                    <div className="address-info-content" style={{maxWidth:500}}>
                        <label>Para</label>
                        <input value={addressInfo.name} readOnly></input>
                    </div>

                    <div className="address-cep-estado-cidade">

                        <div className="address-info-content" style={{width:200}}>
                            <label>cep</label>
                            <input value={addressInfo.cep} readOnly></input>
                        </div>

                        <div className="address-info-content" style={{width:100}}>
                            <label>Estado</label>
                            <input value={addressInfo.uf} readOnly></input>
                        </div>

                        <div className="address-info-content" style={{maxWidth:300}}>
                            <label>Cidade</label>
                            <input value={addressInfo.localidade} readOnly></input>
                        </div>

                    </div>

                    <div className="address-bairro-avenida-numero">

                        <div className="address-info-content" style={{width:200}}>
                            <label>bairro</label>
                            <input value={addressInfo.bairro} readOnly></input>
                        </div>
                        
                        <div className="address-info-content" style={{maxWidth:500}}>
                            <label>Endereço</label>
                            <input value={addressInfo.logradouro} readOnly></input>
                        </div>
                        
                        <div className="address-info-content" style={{width:100}}>
                            <label>Numero</label>
                            <input value={addressInfo.number} readOnly></input>
                        </div>
        
                    </div>
                    
                    <div className="address-info-content" style={{maxWidth:200}}>
                        <label>Telefone para contato</label>
                        <input value={addressInfo.phone} readOnly></input>
                    </div>

                </div>
                <h4 className="review-content-text">PRODUCTS</h4>
                {cartItems.map( item => (
                    
                <div key={item.product} className="list-body-review">
                    <div className="body-img">
                        {images.map( image => (
                            image.key === item.key && 
                            <img key={image.key} src={image.url} alt="product"></img>
                        ))}
                    </div>

                    <div className="body-details">
                        <h3>{item.name}</h3>
                        <h4>Quantidade: {item.qty}</h4>
                    </div>

                    <div className="body-price">
                        <h3>R$ {item.price}</h3>
                    </div>

                
                </div>

                ))}
            

            </div>
            
            <div className="review-content">

                <h3>Finalizar Compra</h3>

                <div className="review-qty">
                    <label>Quantidade</label>
                    <h4>{amount}</h4>
                </div>

                <div className="review-amount">
                    <label>Preço Final:</label>
                    <h4>R$ {totalPrice}</h4>
                </div>
                
                <div className="paypal-button">
                    {cartItems.length > 0 ?

                    userInfo ? 
                    <Paypal toPay={totalPrice} amount={amount} onSuccess={transactionSuccess} transactionError={transactionError} />
                    :
                    <button onClick={() => props.history.push('/signin')} className="button-buy">Comprar!</button>

                    : <div></div>
                    }
                </div>
                
                

            </div>

        </div>
        </main>
        :
        <div>
            {props.history.push('/')}
        </div>
    )
}

export default ReviewPayment
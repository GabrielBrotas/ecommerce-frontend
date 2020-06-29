import React, { useEffect } from 'react'

import '../styles/admin.css'
import { useSelector, useDispatch } from 'react-redux'
import { listPayments, changeDelivered} from '../actions/productActions'

function Sales(props){
    
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const paymentList = useSelector(state => state.paymentList)
    const {payments, loading} = paymentList

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(listPayments(null))

    }, [dispatch])


    const changeStatus = (id) => {
        dispatch(changeDelivered(id))
    }

    return(
        loading ? <div>Loading...</div> :
        userInfo && userInfo.isAdmin ? 
        
        <main className="main">

            <table className="admin-table">

                <thead>
                    <tr>
                        <th>Data de Solicitação</th>
                        <th>Para</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço Pago</th>
                        <th>Endereço de entrega</th>
                        <th>Contato</th>
                        <th>Entregue?</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id}>
                            <td>{payment.date}</td>
                            <td>{payment.address.name}</td>
                            <td>{payment.product}</td>
                            <td>{payment.amount}</td>
                            <td>R$ {payment.totalPrice}</td>
                            <td>
                                {payment.address.localidade} / {payment.address.uf} <br></br> 
                                Bairro: {payment.address.bairro} <br></br>
                                Endereço: {payment.address.logradouro} <br></br>
                                Numero: {payment.address.number}
                            </td>
                            <td>
                                {payment.address.phone}
                            </td>
                            <td>{payment.delivered ? 'sim' : 'nao'}</td>
                            <td>
                                <button className="admin-button" onClick={() => changeStatus(payment._id)}>Entregue</button>
                            </td>
                        </tr>
                    ))} 
                </tbody>

            </table>    
            

        </main>
        :
        <div>
            {props.history.push('/')}
        </div>
    )
}

export default Sales
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {listPayments} from '../actions/productActions'
import '../styles/admin.css'

function Compras(props){

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin


    const paymentList = useSelector(state=> state.paymentList)
    const {loading, payments, error} = paymentList

    const dispatch = useDispatch()

    // const [page, setPage] = useState(1)
    // const limit = 8

    useEffect(() => {
        if(userInfo) {
            dispatch(listPayments(userInfo._id))
        } else {
            props.history.push('/')
        }
        
    }, [userInfo, dispatch, props.history])


    return(
        loading ? <div>Loading...</div>
        :
        error ? <div>Erro: {error} </div> 
        :
 
        <main className="main">
            <div className="compras-info-content">
                <h2>PAYMENT HISTORY</h2>
            </div>
            <table className="admin-table">

                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>

                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {payments.map(payment => (
                        <tr key={payment._id}>
                            <td>{payment.date}</td>
                            <td>{payment.product}</td>
                            <td>{payment.amount}</td>
                            <td>R$ {payment.totalPrice}</td>
                            <td>{!payment.delivered ? 'Pendente' : 'Entregue'}</td>
                        </tr>
                    ))} 
                </tbody>

            </table>

            <div className="triangle-buttons">
                {/* {previous && <div onClick={() => setPage(page-1)} className="triangle-prev"></div>} */}
                {/* {next && <div className="triangle-next" onClick={ () => setPage(page+1)}></div>} */}
            </div>
            

        </main>
       
    )
}

export default Compras
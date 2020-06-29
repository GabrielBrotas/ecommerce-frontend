import React, {useState, useEffect} from 'react'
import '../styles/user.css'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../actions/userActions'


function Signin(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const userSignin = useSelector(state => state.userSignin)
    const {loading, userInfo, error} = userSignin

    const dispatch = useDispatch()

    useEffect( () => {

        if(userInfo) {
            if(props.location.search){
                props.history.push('/cart')
            } else {
                props.history.push('/')
            }
            
        }

        return () => {
            //
        }

    }, [userInfo, props.history, props.location.search])


    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(signin(email, password))
        
    }


    return(
        loading ? <div>Loading...</div> :
        

        <main className="main-user">
            
            <div className="user-content">
                <h3 className="user-title">Sign in</h3>
                

                <form onSubmit={submitHandler}>
                    <ul className="user-form">
                        {error && <li>{error}</li>}
                        <li>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Email..." required></input>
                        </li>

                        <li>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password..." required></input>
                        </li>

                        <li>
                            <button className="button">Sign in</button>
                        </li>

                        <li>
                            <div className="link-register">
                            <p>Ainda não tem uma conta?</p>
                            <div className="link-cadastrar">

                            </div>
                            <Link to="/signup" style={{ textDecoration: 'none', color:'#fff', cursor:'pointer', fontWeight:'600' }}> Cadastre-se &#10095;&#10095; </Link>
                            </div>
                        </li>

                    </ul>

                </form>

            </div>

        </main>

    )
}

export default Signin
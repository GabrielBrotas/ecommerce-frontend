import React, {useState, useEffect} from 'react'
import '../styles/user.css'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/userActions'

function Signup(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    // verificar se o usuario já está logado
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister

    console.log('*** user info ==')
    // console.log(userInfo)

    const dispatch = useDispatch()

    useEffect( () => {

        if(userInfo) {
            props.history.push('/')
        }

        return () => {
            // clean up
        }

    }, [dispatch, userInfo, props.history])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(register(name, email, password))
    }


    return(
        loading ? <div>loading...</div> :
        error ? <div>error... {error}</div> :

        <main className="main-user">
            
            <div className="user-content">
                <h3 className="user-title">Sign up</h3>
                

                <form onSubmit={submitHandler}>
                    <ul className="user-form">

                        <li>
                            <label htmlFor="name">Nome</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Nome do item..." required></input>
                        </li>

                        <li>
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="Email..." required></input>
                        </li>

                        <li>
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Password..." required></input>
                        </li>

                        <li>
                            <button className="button">Cadastrar</button>
                        </li>


                    </ul>

                </form>

            </div>

        </main>

    )
}

export default Signup
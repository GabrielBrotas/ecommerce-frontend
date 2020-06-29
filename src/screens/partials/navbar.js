import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import '../../styles/partials.css'
import { useSelector } from 'react-redux'

import Cookie from 'js-cookie'

function Navbar(){

    const productList = useSelector(state => state.productList)
    const {loading, products, error } = productList

    const UserSignin = useSelector(state => state.userSignin)
    const {userInfo} = UserSignin

    const cartList = useSelector(state => state.cartList)
    const {cartItems} = cartList

    const logout = () => {
        Cookie.remove('userInfo')
        window.location.reload()
    }

    const [inputBar, setInputBar] = useState('')

    useEffect( () => {

        const searchBar = document.querySelector('.ul-products').getElementsByTagName('li')

        Array.from(searchBar).forEach(item => (
            
            inputBar === "" ? (item.style = 'display: none') :
            
            item.textContent.toLowerCase().match(inputBar.toLowerCase()) ?
            (item.style = "display: block") :
            (item.style = 'display: none') 
            
        ))

        
    }, [inputBar])

    const showNavbar = () => {
        const navBarAbove = document.querySelector('.navbar-ul-above')
        const navBarBelow = document.querySelector('.navbar-ul-below')

        navBarAbove.classList.remove('navbar-hide')
        navBarBelow.classList.remove('navbar-hide')

        navBarAbove.classList.add('navbar-show')
        navBarBelow.classList.add('navbar-show')

        document.querySelector('.navbar-icon-close').classList.add('closeNavBar')
        
    }

    const hideNavbar = () => {
        const navBarAbove = document.querySelector('.navbar-ul-above')
        const navBarBelow = document.querySelector('.navbar-ul-below')

        navBarAbove.classList.add('navbar-hide')
        navBarBelow.classList.add('navbar-hide')

        navBarAbove.classList.remove('navbar-show')
        navBarBelow.classList.remove('navbar-show')

        document.querySelector('.navbar-icon-close').classList.remove('closeNavBar')
    }
    

    return(
        loading ? <div>Navbar loading...</div> :
        error ? <div>Erro = {error}</div>:

        <header className="header">
    
            <div className="navbar-logo">
                <Link to="/"><div className="shieldLogo"></div></Link>
            </div>

            <div className="navbar-links above">
                <ul className="navbar-ul-above navbar-hide" >
                    <Link to="/products/?filter=All" style={{ textDecoration: 'none' }}><li>Products</li></Link>
                </ul>
            </div>
            
            
            <div className="navbar-input">
                <input type="text" name="search" autoComplete="off" placeholder="O que está procurando?" value={inputBar} onChange={(e) => setInputBar(e.target.value)}></input>
                <div className="box-suggestion">
                    <ul className="ul-products">
                        {products.map(product => (
                            <Link to={"/product/" + product._id} key={product._id} style={{ textDecoration: 'none' }}>
                            <li onClick={() => setInputBar('')} id="inputSearch" >{product.name}</li>
                            </Link>
                        ))}
                        
                    </ul>
                </div>

            </div>

            <div className="navbar-links rigth below">
                
                <ul className="navbar-ul-below navbar-hide" >

                    <div className="shoppingCart">

                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <li>Carrinho</li>
                    </Link>

                    {cartItems.length > 0 &&
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <div className="items-in-car">
                        {cartItems.length}
                    </div>
                    </Link>
                    }

                    </div> 

                    {userInfo && <Link to="/compras" style={{ textDecoration: 'none' }}><li>Compras</li></Link>}

                    {userInfo ? 
                        <li onClick={logout}>Logout</li> : 
                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <li>Sign in</li>
                    </Link>
                    }
                    
                    
                    
                     


                    {userInfo && userInfo.isAdmin && <Link to="/admin/products" style={{ textDecoration: 'none' }}><li>Admin</li></Link> }
                    
                    
                </ul>
            </div>
            
            
            <div className="mobileview" onClick={showNavbar}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <div className="navbar-icon-close" onClick={hideNavbar}>
               <div className="navbar-lines-close">
                    <div className="line-close-one"></div>
                    <div className="line-close-two"></div>
               </div>
            </div>
        </header>

    )
}

export default Navbar
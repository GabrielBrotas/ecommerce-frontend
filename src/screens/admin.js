import React, { useEffect, useState } from 'react'
import {Link, Route} from 'react-router-dom'

import AdminProducts from './adminProducts'
import AdminSales from './adminSales'

function Admin(props) {

    const [activeNavbar, setActiveNavbar] = useState('navbar-product')

    useEffect( () => {
        // css para o filtro clicado,
        const filterProducts = document.getElementById('navbar-product')
        const filterSales= document.getElementById('navbar-sales')
            
        if (activeNavbar === 'navbar-product') {
            filterProducts.style.borderBottom = "4px solid #0078f2"
            filterSales.style.borderBottom = "0px"
        } else {
            filterSales.style.borderBottom = "4px solid #0078f2"
            filterProducts.style.borderBottom = "0px"
        }
        

    }, [activeNavbar])

    return(
        <div className="admin-content">
            <ul className="admin-navbar">
                <Link to="/admin/products" style={{ textDecoration: 'none' }}><li id="navbar-product" onClick={(e) => setActiveNavbar(e.currentTarget.id)}>Produtos</li></Link>

                <Link to="/admin/sales" style={{ textDecoration: 'none' }}><li id="navbar-sales" onClick={(e) => setActiveNavbar(e.currentTarget.id)}>Sales</li></Link>
                
            </ul>

            <div className="admin-main">

                <Route path="/admin/sales" render={ (props) => <AdminSales {...props} />}></Route>

                <Route path="/admin/products" exact={true} render={ (props) => <AdminProducts {...props} />}></Route>

                
            </div>


        </div>
    )
}

export default Admin
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
// useSelector se comunica com a store/reducer, useDispatch dispara uma função para as actions
import {useSelector, useDispatch} from 'react-redux'

import '../styles/index.css'
import { listProducts } from '../actions/productActions'
import { listImages } from '../actions/imageActions'


function HomePage() {

    // const [carouselImage, setCarouselImage] = useState(0)
    
    const productList = useSelector(state => state.productList)
    const {products, loading, error} = productList

    const imageList = useSelector( state => state.imageList)
    const {loadingImages, images} = imageList

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(listProducts(null))
        dispatch(listImages())
    }, [dispatch])
    

    // carousel functions 
    const [counter, setCounter] = useState(0)

    const qtyImages = 3
    
    let windowSize = window.innerWidth
    const imagesSize = 1500
    
    const verifyWindowSize = () => {
        windowSize = window.innerWidth

        // caso a tela for maior que o tamanho da imagem(1500px) travar nesse valor
        if(windowSize >= imagesSize) { 
            windowSize = imagesSize
        }

        return windowSize
    }

    const nextCarouselPhoto = () => {

        const carouselSlide = document.querySelector('.slide-container')
    
        const windowSize = verifyWindowSize()

        if(counter < qtyImages - 1 ) {
            setCounter(counter+1);
            carouselSlide.style.transform = 'translateX(' + (-windowSize * (counter + 1)) +'px)'
            
            
        } else {
            setCounter(0)
            carouselSlide.style.transform = 'translateX(0px)'
        }
        
    }

    const prevCarouselPhoto = () => {
        
        const carouselSlide = document.querySelector('.slide-container')
        const windowSize = verifyWindowSize()

        if(counter > 0) {
            setCounter(counter-1);
            carouselSlide.style.transform = 'translateX(' + (windowSize + ((-counter) * windowSize)) +'px)'
            
        } else {
            setCounter(qtyImages - 1)
            carouselSlide.style.transform = 'translateX(' + (-windowSize * (qtyImages-1)) +'px)'
        }
        
    }
    

    return( 
        loading || loadingImages ? <div>Loading...</div>
        :
        error ? <div>{error}</div>
        :
        <main className="main">

            <div className="carousel-container">
                <div  className="slide-container">

                    {products.map(product => (
                        product.carousel && 

                        <div key={product._id} className="carousel-slide"> 

                            <div className="image-content">
                                {images.map( image => (
                                        image.key === product.key && 
                                        <img className="image-carousel" key={image.key} src={image.url} alt='Carousel Foto'></img>
                                    ))}
                            </div>
                            
                            <div className="box-buy">
                                <Link to={'product/'+product._id} style={{ textDecoration: 'none' }}>Saiba Mais</Link>
                            </div>
                        </div>

                    ))}

                        
                </div>

                <div className="arrows-div">
                    <div className="box-arrow">
                        <img  onClick={prevCarouselPhoto} className="seta-left" src="/images/de-volta.png" alt="Arrow next"></img>
                    </div>
                    
                    <div className="box-arrow" >
                        <img onClick={nextCarouselPhoto} className="seta-right" src="/images/proximo.png" alt="Arrow prev "></img>
                    </div>
                </div>
            </div>

            <div className="products-content">
                <Link to="/products/?filter=Controle" style={{ textDecoration: 'none', color: '#161616' }}>
                <div className="product-one">
                    
                    <div className="products-highligth">
                        <h2>Controles Personalizados</h2>
                        <p>Escolha entre dezenas de controles personalizados com a temática do seu game favorito, além de controles com temas de filmes, animes e muito mais. Tudo de Gamers para Gamers</p>
                    </div>
    
                    <div className="product-one-background">
                        <img src="/images/controller.png" alt="controller"></img>
                    </div>

                </div>
                </Link>
                
                <Link to="/products/?filter=Game" style={{ textDecoration: 'none', color: '#161616' }}>
                <div className="product-two">

                    <div className="products-highligth">
                        <h2>Jogos Diversos</h2>
                        <p>A Maior loja de games do Brasil, comprar jogos para PS4, PS3, XBOX One, XBOX 360, Wii, DS, 3DS e muito mais.</p>
                    </div>

                    <div className="product-two-background">
                        <img src="/images/soldier.png" alt="soldier"></img>
                    </div>

                </div>
                </Link>
            </div>

            <div className="bests-sellers-content">
                
                <h2>Mais Vendidos</h2>
                <div className="box-best-products">
                    
                    {products.map(product => (
                        product.bestseller &&
                        <div key={product._id} className="product-bestseller-content">
                            
                            <div className="product-bestseller-img">

                            <Link to={"/product/" + product._id} style={{ textDecoration: 'none', color: '#161616' }}>

                                {images.map( image => (
                                    image.key === product.key && 
                                    <img key={image.key} src={image.url} alt="Product"></img>
                                ))}

                            </Link>
                                
                            </div>

                        </div>
                    ))
                    }                
 
                </div>

                <div>
                    <Link to="/products/filter?=All"><button className="button">See More</button></Link>
                </div>
            </div>
            

            
        </main>
    )
}

export default HomePage
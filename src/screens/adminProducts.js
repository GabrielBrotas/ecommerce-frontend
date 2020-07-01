import React, { useEffect, useState } from 'react'
import '../styles/admin.css'

// libraries
import { useSelector, useDispatch } from 'react-redux'
import {uniqueId} from 'lodash'
import filesize from 'filesize'
import {isEmpty} from '../helper'

// actions
import {listImages, uploadImage,  deleteImage} from '../actions/imageActions'
import { listProducts, saveProduct, deleteProduct} from '../actions/productActions'


// components
import Upload from '../components/Upload'
import FileImage from '../components/FileImage'
import {Preview} from '../components/FileImage/styles'

function Admin(props) {

    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const productList = useSelector(state=> state.productList)
    const {loading, products, error, next, previous} = productList

    const imageUpload = useSelector(state=> state.imageUpload)
    const {progress, uploaded, image, errorUpload} = imageUpload
    
    const imageList = useSelector( state => state.imageList)
    const {loadingImages, images} = imageList


    const [id, setId] = useState('')
    const [key, setKey] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('Game')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [bestseller, setBestseller] = useState(false)
    const [carousel, setCarousel] = useState(false)

    const [uploadedFile, setUploadedFile] = useState({})
    const [showForm, setshowForm] = useState(false)

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const limit = 8

    // take list of products and images
    useEffect(() => {
        dispatch(listProducts(null, page, limit))
        dispatch(listImages())
    }, [dispatch, page, limit])

    // open new item or edit item form
    const openForm = (product) => {
        setshowForm(true)

        if(product._id) {
            setId(product._id)
            setName(product.name)
            setPrice(product.price)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
            setBestseller(product.bestseller)
            setCarousel(product.carousel)

            images.map( image => (
                image.key === product.key && setUploadedFile({...image, uploaded: true, readableSize: filesize(image.size)} )
            ))
        }
    }


    // fazer upload da imagem 
    const submitHandler = () => {
        if(name !== "" && !isEmpty(uploadedFile)){   
            if(key){
                dispatch(deleteImage(key))
            } 
            dispatch(uploadImage(uploadedFile))
        } else {
            alert('Preencha todos os campos!')
        } 
    }
    

    // Depois de feito o upload salvar os dados do produto
    useEffect( () => {
        setUploadedFile({...uploadedFile, progress})

        if(uploaded){
            setUploadedFile({...uploadedFile, id: image.key, url: image.url, uploaded})
            setshowForm(!showForm)
            saveProductData()
            setUploadedFile({})
            window.location.reload()
        }

        if(errorUpload){
            setUploadedFile({...uploadedFile, error: true})
        }

        // eslint-disable-next-line
    }, [progress, uploaded, errorUpload, image])

    const saveProductData = () => {
        dispatch(saveProduct({
            _id: id,
            name, fileUrl: image.url, key: image.key, price, category, countInStock, description, bestseller, carousel
        }))
    }

    // pegar os dados da imagem para fazer upload
    const handleUpload = (files) => {
        const file = files[0]
        const newUploadedFile = {
            file,
            id: uniqueId(),
            name: file.name,
            // os arquivos vem em bytes, vamos transformalos em kb-mb-etc
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file), // url de preview antes de a imagem chegar no servidor
            progress: 0,
            uploaded: false,
            error: false,
            url: null, // url que vai redirecionar para a imagem, inicia como null pois só vai ser preenchida depois de preenchido o upload
        }
        products.map( product =>
            product.key === uploadedFile.key && setKey(uploadedFile.key)
        )
        setUploadedFile(newUploadedFile)    
    }

    // cancelar upload
    const cancelUpload = () => {
        setUploadedFile({});
    }

    const deleteUpload = (key) =>{
        setUploadedFile({});
        setKey(key)
    }

    // remove product
    const deleteHandler = (key) => {
        dispatch(deleteProduct(key))
        dispatch(deleteImage(key))
        window.location.reload()
    }

    // fechar form
    const cancelForm = () => {
        setshowForm(false)
        setUploadedFile({})
        setId('')
        setKey('')
        setName('')
        setPrice(0)
        setCategory('Game')
        setCountInStock(0)
        setDescription('')
        setBestseller(false)
        setCarousel(false)
    }


    return(
        loading || loadingImages ? <div>Loading...</div>
        :
        error ? <div>Erro: {error} </div> 
        :

        userInfo && userInfo.isAdmin ? 
        
        
        <>
            {showForm && 
            <div className="itemConfig-content">
                <h3 className="itemConfig-title">
                    {id ? 'Editar item' 
                    :
                    'Adicionar novo item'}
                </h3>
                

                <form>
                    <ul className="itemConfig-form">

                        <li>
                            <label htmlFor="name">Nome</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" placeholder="Nome do item..." required></input>
                        </li>

                        <li>
                            <label htmlFor="category">Categoria</label>
                            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Game</option>
                                <option>Console</option>
                                <option>Controle</option>
                                <option>Outros</option>
                            </select>
                        </li>
                        
                        <li>
                            <label htmlFor="price">Preço</label>
                            <input name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="any" min="0" required></input>
                        </li>

                        <li>
                            <label htmlFor="countInStock">Quantidade em Estoque</label>
                            <input name="countInStock" value={countInStock} onChange={ (e) => setCountInStock(e.target.value)} type="number" min="0" required></input>
                        </li>

                        <li>
                            <label htmlFor="description">Descrição</label>
                            <textarea name="description" value={description} onChange={ (e) => setDescription(e.target.value)} placeholder="Descrição"></textarea>
                        </li>

                        <li>
                            <label htmlFor="bestseller">Mais Vendidos?</label>
                            <select name="bestseller" value={bestseller} onChange={(e) => setBestseller(e.target.value)}>
                                <option>false</option>
                                <option>true</option>
                            </select>
                        </li>

                        <li>
                            <label  htmlFor="carousel">Carousel?</label>
                            <select name="carousel" value={carousel} onChange={(e) => setCarousel(e.target.value)}>
                                <option>false</option>
                                <option>true</option>
                            </select>
                        </li>

                        <li style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}}>
                            <Upload onUpload={handleUpload} />
                            {(uploadedFile.preview || uploadedFile.url) && (
                                <FileImage file={uploadedFile} onCancel={cancelUpload} onDelete={deleteUpload} />
                            )}
                        </li>

                        <li className="new-item-button">
                            {!progress 
                                ? 
                                <button type="button" className="admin-button" onClick={submitHandler}>{id ? 'Editar' : 'Adicionar'}</button>
                                :
                                <button type="button" className="admin-button" disabled>loading...</button>
                            }
                            
                        </li>
                        <li className="new-item-button">
                            <button type="button" className="admin-button-cancel" 
                            onClick={cancelForm}>Cancelar</button>
                        </li>

                    </ul>

                </form>

            </div>
            }
            {!showForm && 
            <div className="newItemDiv">
                <button className="button" onClick={() => openForm({})}> Adicionar novo Item</button>
            </div>}
            

            <table className="admin-table">

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço (R$)</th>
                        <th>Qtd em Estoque</th>
                        <th style={{width: '50%'}}>Descrição</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                            {images.map( image => (
                                image.key === product.key && 
                                <Preview key={image.key} src={image.url} />
                            ))}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.countInStock}</td>
                            
                            <td className="tr-description">
                                <p>
                                {product.description}
                                </p>
                            </td>
                            <td className="admin-table-actions">
                                <button className="edit-button" onClick={() => openForm(product)}>Editar</button>
                                <button className="delete-button" onClick={ () => deleteHandler(product.key)}>Deletar</button>
                            </td>
                            
                        </tr>
                    ))} 
                </tbody>

            </table>

            <div className="triangle-buttons">
                {previous && <div onClick={() => setPage(page-1)} className="triangle-prev"></div>}
                {next && <div className="triangle-next" onClick={ () => setPage(page+1)}></div>}
            </div>
            

        </>
        :
        <div>
            {props.history.push('/')}
        </div>
        
    )
}

export default Admin
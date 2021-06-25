import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction.js'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

//Col sizes (sm -> proporção (sempre 1 coluna) | md -> proporção (sm/ value_md) | lg -> proporção (sm/ value_lg))
const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector((state) =>
        state.productList
    )
    const { loading, error, products } = productList

    useEffect(() => {   // useEffect executa imediamente quando o componente é chamado
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? (<Loader></Loader>) :
                    error ? (<Message variant='danger' text={error} ></Message>) :
                        (<Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}></Product>
                                </Col>

                            ))}
                        </Row>)
            }
        </>
    )
}

export default HomeScreen

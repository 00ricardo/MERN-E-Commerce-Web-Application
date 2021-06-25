import React, { useEffect } from 'react'
import { Container, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productAction.js'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state =>   //getting the state of product details
        state.productDetails    //store variable that saves the state
    )
    const { loading, error, product } = productDetails //destructuring product details

    useEffect(() => {   // useEffect executa imediamente quando o componente é chamado
        dispatch(listProductDetails(match.params.id))  //dispatch action
    }, [dispatch, match])

    return (
        <>
            <Container>
                <LinkContainer to="/">
                    <Button variant="light">Go Back</Button>
                </LinkContainer>
            </Container>
            {
                loading ? (<Loader></Loader>) :
                    error ? (<Message variant='danger' text={error} ></Message>) :
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid></Image>
                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>{product.name}</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} ></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    <strong> ${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <Row>
                                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

            }

        </>
    )
}

export default ProductScreen

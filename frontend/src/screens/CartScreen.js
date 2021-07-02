import React, { useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => { //match is used to fetch get params, location is used to find parameters passed with question marks like '/api/products/?name="ricardo"' and history is used to redirect to another route
    const productId = match.params.id
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])


    const removeFromCartHandler = (productID) => {
        dispatch(removeFromCart(productID))
    }
    const checkoutPurchase = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Alert variant='light'>Your cart is empty <Link to='/' >Go Back </Link> </Alert>) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.quantity} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => ( //I'm getting all index array (for example 0 to 9, considering that may have 10 products in stock)
                                                <option key={x + 1} value={x + 1} /* then... im getting the real value (index + 1) and set it as value*/>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>)}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}) items</h2>
                            ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutPurchase}>
                                    Proceed to Checkout
                                </Button>
                            </Row>

                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}


//Subtotal items -> the function reduce, takes 2 arguments (the accumulator, starting 0 and the current item, then... I just want to accumulate the item quantities)
//Subtotal items -> the function reduce, takes 2 arguments (the accumulator, starting 0 and the current item, then... I just want to accumulate the item quantities and multiply with the price to get the total price (toFixed(2) is used to get number with 2 decimals))
export default CartScreen

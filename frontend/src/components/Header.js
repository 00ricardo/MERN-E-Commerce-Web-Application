import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar } from 'react-bootstrap'
const Header = () => {
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >Ricardo E-Commerce </Navbar.Brand>
                    </LinkContainer>
                    <Nav>
                        <LinkContainer to='/cart'>
                            <Nav.Link ><i id='fas-shopping-cart' className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link ><i id='fas-user' className='fas fa-user'></i>Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

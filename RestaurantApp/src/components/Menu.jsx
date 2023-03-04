import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pizzaMenu from './imgs/pizzaMenu.jpg'
import wingsMenu from './imgs/wingsMenu.jpg'

const Menu = () => {
  return (
    <>
    <Header />    
      <h1>Menu</h1>
      <Container>
            <Row>Nuestro Menu de Pizzas Mochomo's (Aún en desarrollo)</Row>
            <Row>
                <Col className='colIzq'><img src={pizzaMenu} alt="pizzaMenu" className='pizzaMenu' width={'400px'}/></Col>
                <Col className='colDer'>
                    <h1>"Disfruta de nuestra variedad de Pizzas</h1>
                </Col>
            </Row>
            <Row>Nuestro Menu de Alitas Mochomo's (Aún en desarrollo)</Row>
            <Row>
                <Col className='colIzq'><img src={wingsMenu} alt="wingsMenu" className='pizzaMenu' width={'400px'}/></Col>
                <Col className='colDer'>
                    <h1>"Disfruta de nuestra variedad de Alitas</h1>
                </Col>
            </Row>
        </Container>
    <Footer />
  </>
  )
}

export default Menu
import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pizzaWings from './imgs/pizzaWings.jpg';


const Jumbotron = () => {
  return (
    <>
    <h1>Bienvenidos a Mochomo's Pizza and Wings!</h1>
        <Container>
            <Row>
                <Col className='colIzq'><img src={pizzaWings} alt="pizzaWings" className='pizzaImage' width={'600px'}/></Col>
                <Col className='colDer'>
                    <h1>"Disfruta de nuestra variedad de Pizzas y 
                    Alitas con la especialidad y sazon de nuestro gran Chef "El Mochomo""
                    </h1>
                </Col>
            </Row>
        </Container>
    </>
)
}

export default Jumbotron
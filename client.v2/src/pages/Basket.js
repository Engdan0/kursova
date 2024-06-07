import BasketList from '../components/BasketList.js'
import { Container } from 'react-bootstrap'

const Basket = () => {
    return (
        <Container>
            <h1>Кошик</h1>
            <BasketList />
        </Container>
    )
}

export default Basket
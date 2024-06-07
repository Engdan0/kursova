import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const User = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <h1>Особистий кабінет</h1>
            <p>
                Це особисти кабінет користувача
            </p>
            <ul>
                <li><Link to="/user/orders">Історія замовлень</Link></li>
            </ul>
            <Button onClick={handleLogout}>Вийти</Button>
        </Container>
    )
}

export default User
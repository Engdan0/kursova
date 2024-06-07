import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const Admin = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <h1>Панель управління</h1>
            <p>
                Це панель управління магазином для адміністратора
            </p>
            <ul>
                <li><Link to="/admin/orders">Замовлення в магазині</Link></li>
                <li><Link to="/admin/categories">Категорії каталога</Link></li>
                <li><Link to="/admin/brands">Видавництва каталога</Link></li>
                <li><Link to="/admin/products">Товари каталога</Link></li>
            </ul>
            <Button onClick={handleLogout}>Вийти</Button>
        </Container>
    )
}

export default Admin
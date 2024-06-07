import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
    const { user, basket } = useContext(AppContext)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to="/" className="navbar-brand">Магазин</NavLink>
                <Nav className="ml-auto">
                    <NavLink to="/delivery" className="nav-link">Доставка</NavLink>
                    <NavLink to="/contacts" className="nav-link">Контакти</NavLink>
                    {user.isAuth ? (
                        <NavLink to="/user" className="nav-link">Особистий кабінет</NavLink>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">Увійти</NavLink>
                            <NavLink to="/signup" className="nav-link">Реєстрація</NavLink>
                        </>
                    )}
                    {user.isAdmin && (
                        <NavLink to="/admin" className="nav-link">Панель управління</NavLink>
                    )}
                    <NavLink to="/basket" className="nav-link">
                        Кошик
                        {!!basket.count && <span>({basket.count})</span>}
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar
import { useState, useEffect } from 'react'
import { fetchAllProducts, deleteProduct } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap'
import CreateProduct from '../components/CreateProduct.js'
import UpdateProduct from '../components/UpdateProduct.js'

// кількість товарів на сторінці
const ADMIN_PER_PAGE = 6

const AdminProducts = () => {
    const [products, setProducts] = useState([]) // список завантажених товарів
    const [fetching, setFetching] = useState(true) // завантаження списку товарів з сервера
    const [createShow, setCreateShow] = useState(false) // модальне вікно створення товару
    const [updateShow, setUpdateShow] = useState(false) // модальне вікно редагування
    // для оновлення списку після додавання, редагування, видалення — змінюємо стан
    const [change, setChange] = useState(false)
    // id товару, котрий будемо редагувати — для передачі в <UpdateProduct id={…} />
    const [product, setProduct] = useState(null)

    // поточна сторінка списку товарів
    const [currentPage, setCurrentPage] = useState(1)
    // скільки всього сторінок списку товарів
    const [totalPages, setTotalPages] = useState(1)

    // обробка натискання на число сторінок товарів
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // вміст компоненту <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setProduct(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteProduct(id)
            .then(
                data => {
                    // якщо це останняя сторінка і ми видаляємо на ній останній
                    // товар — то треба перейти на попередню сторінку
                    if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Товар «${data.name}» видалено`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setProducts(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Товар</h1>
            <Button onClick={() => setCreateShow(true)}>Створити товар</Button>
            <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateProduct id={product} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {products.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Назва</th>
                            <th>Фото</th>
                            <th>Категорія</th>
                            <th>Видавництво</th>
                            <th>Ціна</th>
                            <th>Редагувати</th>
                            <th>Видалити</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&
                                    <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">фото</a>}
                                </td>
                                <td>{item.category?.name || 'NULL'}</td>
                                <td>{item.brand?.name || 'NULL'}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                        Редагувати
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                        Видалити
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p>Список товарів пустий</p>
            )}
        </Container>
    )
}

export default AdminProducts
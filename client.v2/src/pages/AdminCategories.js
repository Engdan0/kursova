import { useState, useEffect } from 'react'
import { fetchCategories, deleteCategory } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditCategory from '../components/EditCategory.js'

const AdminCategories = () => {
    const [categories, setCategories] = useState(null) // список завантажених категорій
    const [fetching, setFetching] = useState(true) // завантаження списку категорій з сервера
    const [show, setShow] = useState(false) // модальне вікно створення-редагування
    // для оновлення списку після додавання, редагування, видалення — змінюємо стан
    const [change, setChange] = useState(false)
    // id категорії, котру будемо редагувати — для передачі в <UpdateCategory id={…} />
    const [categoryId, setCategoryId] = useState(null)

    const handleCreateClick = () => {
        setCategoryId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setCategoryId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteCategory(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Категорія «${data.name}» видалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Категорії</h1>
            <Button onClick={() => handleCreateClick()}>Створити категорію</Button>
            <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} />
            {categories.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Назва</th>
                            <th>Редагувати</th>
                            <th>Видалити</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
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
            ) : (
                <p>Список категорій пустий</p>
            )}
        </Container>
    )
}

export default AdminCategories
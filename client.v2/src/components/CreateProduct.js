import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { createProduct, fetchCategories, fetchBrands } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'
import CreateProperties from './CreateProperties.js'

const defaultValue = {name: '', price: '', category: '', brand: ''}
const defaultValid = {name: null, price: null, category: null, brand: null}

const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== ''
        if (key === 'price') result.price = pattern.test(value.price.trim())
        if (key === 'category') result.category = pattern.test(value.category)
        if (key === 'brand') result.brand = pattern.test(value.brand)
    }
    return result
}

const CreateProduct = (props) => {
    const { show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)

    // вибране для завантаження зображення товару
    const [image, setImage] = useState(null)

    // список характеристик товару
    const [properties, setProperties] = useState([])

    // список категорій та список видавництв для можливості вибору
    const [categories, setCategories] = useState(null)
    const [brands, setBrands] = useState(null)

    // треба отримати з сервера список категорій та список видавництв
    useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
            )
        fetchBrands()
            .then(
                data => setBrands(data)
            )
    }, [])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = isValid(value)
        setValid(correct)

        // всі поля форми пройшли перевірку, можна отправляти дані на сервер
        if (correct.name && correct.price && correct.category && correct.brand) {

            const data = new FormData()
            data.append('name', value.name.trim())
            data.append('price', value.price.trim())
            data.append('categoryId', value.category)
            data.append('brandId', value.brand)
            if (image) data.append('image', image, image.name)
            // характеристики нового товару
            if (properties.length) {
                const props = properties.filter(
                    prop => prop.name.trim() !== '' && prop.value.trim() !== ''
                )
                if (props.length) {
                    data.append('props', JSON.stringify(props))
                }
            }

            createProduct(data)
                .then(
                    data => {
                        // приводимо форму в початковий стан
                        event.target.image.value = ''
                        setValue(defaultValue)
                        setValid(defaultValid)
                        setProperties([])
                        // закриваємо модальне вікно створення товару
                        setShow(false)
                        // змінюємо стан компонента списку товарів
                        setChange(state => !state)
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Новий товар</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="Названня товару..."
                        className="mb-3"
                    />
                    <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="category"
                                value={value.category}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.category === true}
                                isInvalid={valid.category === false}
                            >
                                <option value="">Категорія</option>
                                {categories && categories.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Select
                                name="brand"
                                value={value.brand}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.brand === true}
                                isInvalid={valid.brand === false}
                            >
                                <option value="">Видавництво</option>
                                {brands && brands.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="price"
                                value={value.price}
                                onChange={e => handleInputChange(e)}
                                isValid={valid.price === true}
                                isInvalid={valid.price === false}
                                placeholder="Ціна товара..."
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Фото товару..."
                            />
                        </Col>
                    </Row>
                    <CreateProperties properties={properties} setProperties={setProperties} />
                    <Row>
                        <Col>
                            <Button type="submit">Зберегти</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateProduct
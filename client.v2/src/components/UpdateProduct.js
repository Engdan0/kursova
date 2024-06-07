import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { fetchOneProduct, updateProduct, fetchCategories, fetchBrands } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import UpdateProperties from './UpdateProperties.js'
import { createProperty, updateProperty, deleteProperty } from '../http/catalogAPI.js'

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

const updateProperties = async (properties, productId) => {
    for (const prop of properties) {
        const empty = prop.name.trim() === '' || prop.value.trim() === ''
        // якщо стара хар-ка виявилась пустою — видалим її на сервері
        if (empty && prop.id) {
            try {
                await deleteProperty(productId, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        /*
         * Якщо в об'єкта prop властивість append дорівнює true — це нова хар-ка, її треба створити.
         * Якщо в об'єкта prop властивість change дорівнює true — хар-ка змінилась, її треба оновити.
         * Якщо в об'єкта prop властивість remove дорівнює true — хар-ку видалили, її треба видалити.
         */
        if (prop.append && !empty) {
            try {
                await createProperty(productId, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.change && !prop.remove) {
            try {
                await updateProperty(productId, prop.id, prop)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
        if (prop.remove) {
            try {
                await deleteProperty(productId, prop.id)
            } catch(error) {
                alert(error.response.data.message)
            }
            continue
        }
    }
}

const UpdateProduct = (props) => {
    const { id, show, setShow, setChange } = props

    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)

    // список категорій та список видавництв для змоги вибору
    const [categories, setCategories] = useState(null)
    const [brands, setBrands] = useState(null)

    // обране для завантаження зображення товару
    const [image, setImage] = useState(null)

    // список характеристик товару
    const [properties, setProperties] = useState([])

    useEffect(() => {
        if(id) {
            // треба отримати з сервера дані товару для редагування
            fetchOneProduct(id)
                .then(
                    data => {
                        const prod = {
                            name: data.name,
                            price: data.price.toString(),
                            category: data.categoryId.toString(),
                            brand: data.brandId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                        setProperties(data.props.map(item => {
                            // при додаванні нової хар-ки властивість append приймає значення true
                            // при зміна старої хар-ки властивість change приймає значення true
                            // при видалення старої хар-ки властивість remove приймає значення true
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
            // треба отримати з сервера список категорій та список видавництв
            fetchCategories()
                .then(
                    data => setCategories(data)
                )
            fetchBrands()
                .then(
                    data => setBrands(data)
                )
        }
    }, [id])

    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()


        const correct = isValid(value)
        setValid(correct)

        //якщо введені данні пройшли перевірку — можна відправляти їх на сервер
        if (correct.name && correct.price && correct.category && correct.brand) {
            const data = new FormData()
            data.append('name', value.name.trim())
            data.append('price', value.price.trim())
            data.append('categoryId', value.category)
            data.append('brandId', value.brand)
            if (image) data.append('image', image, image.name)
            if (properties.length) {
                await updateProperties(properties, id)
            }

            updateProduct(id, data)
                .then(
                    data => {
                        // скидаємо поле завантаження зображення, щоб при збереженні товару,
                        // коли нове зображення не обрано, не завантажувати старе знову
                        event.target.image.value = ''
                        const prod = {
                            name: data.name,
                            price: data.price.toString(),
                            category: data.categoryId.toString(),
                            brand: data.brandId.toString()
                        }
                        setValue(prod)
                        setValid(isValid(prod))
                        // ми отримаємо актуальні значення хар-тик з сервера, тому що оновлення
                        // хар-тик завершилось ще до момента відправки цього http-запита на сервер
                        setProperties(data.props.map(item => {
                            return {...item, unique: uuid(), append: false, remove: false, change: false}
                        }))
                        // закриваємо вікно редагування товару
                        setShow(false)
                        // змінюємо стан, щоб оновити список товарів
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
                <Modal.Title>Редагування товару</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={value.name}
                        onChange={e => handleInputChange(e)}
                        isValid={valid.name === true}
                        isInvalid={valid.name === false}
                        placeholder="Назва товару..."
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
                                placeholder="Ціна товару..."
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
                    <UpdateProperties properties={properties} setProperties={setProperties} />
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

export default UpdateProduct
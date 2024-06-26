import { Modal, Button, Form } from 'react-bootstrap'
import { createCategory, fetchCategory, updateCategory } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'

const EditCategory = (props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('')
    const [valid, setValid] = useState(null)

    useEffect(() => {
        if(id) {
            fetchCategory(id)
                .then(
                    data => {
                        setName(data.name)
                        setValid(data.name !== '')
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('')
            setValid(null)
        }
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const correct = name.trim() !== ''
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim()
            }
            const success = (data) => {
                // закрываємо модальне вікно створення-редагування
                setShow(false)
                // змінюємо стан родителя, щоб оновити список категорій
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            id ? updateCategory(id, data).then(success).catch(error) : createCategory(data).then(success).catch(error)
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редагування' : 'Створення'} категорії</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Назва категорії..."
                        className="mb-3"
                    />
                    <Button type="submit">Зберегти</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditCategory
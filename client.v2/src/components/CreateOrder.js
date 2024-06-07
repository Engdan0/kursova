import { Modal, Button } from 'react-bootstrap'

const CreateOrder = (props) => {
    const { show, setShow } = props
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Нове замовлення</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Форма для створення замовлення</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>Закрыть</Button>
                <Button variant="primary">Зберегти</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateOrder
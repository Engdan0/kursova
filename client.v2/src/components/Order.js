import { Table } from 'react-bootstrap'

const Order = (props) => {
    return (
        <>
            <ul>
                <li>Дата замовлення: {props.data.prettyCreatedAt}</li>
                <li>
                    Статус замовлення:
                    {props.data.status === 0 && <span>Нове</span>}
                    {props.data.status === 1 && <span>У роботі</span>}
                    {props.data.status === 2 && <span>Завершене</span>}
                </li>
            </ul>
            <ul>
                <li>Им'я, прізвище: {props.data.name}</li>
                <li>Адреса пошти:  {props.data.email}</li>
                <li>Номер телефону: {props.data.phone}</li>
                <li>Адреса доставки: {props.data.address}</li>
                <li>Коментарі: {props.data.comment}</li>
            </ul>
            <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Ціна</th>
                        <th>Кіл-сть</th>
                        <th>Сума</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.items.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={3}>Сумарно</td>
                        <td>{props.data.amount}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default Order
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Orders = (props) => {

    if (props.items.length === 0) {
        return <p>Список заказів пустий</p>
    }

    return (
        <Table bordered hover size="sm" className="mt-3">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>Покупець</th>
                    <th>Адреса пошти</th>
                    <th>Телефон</th>
                    <th>Статус</th>
                    <th>Сума</th>
                    <th>Детальніше</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => 
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.prettyCreatedAt}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.status}</td>
                        <td>{item.amount}</td>
                        <td>
                            {props.admin ? (
                                <Link to={`/admin/order/${item.id}`}>Детальніше</Link>
                            ) : (
                                <Link to={`/user/order/${item.id}`}>Детальніше</Link>
                            )}
                            
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default Orders
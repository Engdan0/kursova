import { guestInstance, authInstance } from './index.js'

/*
 * тільки для адміна магазину
 */

// створити нове замовлення
export const adminCreate = async (body) => {
    const { data } = await authInstance.post('order/admin/create', body)
    return data
}
// отримати список усіх замовлень магазину
export const adminGetAll = async () => {
    const { data } = await authInstance.get('order/admin/getall')
    return data
}
// отримати список замовлень магазину
export const adminGetUser = async (id) => {
    const { data } = await authInstance.get(`order/admin/getall/user/${id}`)
    return data
}
// отримати замовлення по id
export const adminGetOne = async (id) => {
    const { data } = await authInstance.get(`order/admin/getone/${id}`)
    return data
}
// видалити замовлення по id
export const adminDelete = async (id) => {
    const { data } = await authInstance.delete(`order/admin/delete/${id}`)
    return data
}

/*
 * для авторизованого користувача
 */

// створити нове замовлення
export const userCreate = async (body) => {
    const { data } = await authInstance.post('order/user/create', body)
    return data
}
// отримати список усіх замовлень користувача
export const userGetAll = async () => {
    const { data } = await authInstance.get('order/user/getall')
    return data
}
// отримати одне замовлення користувача
export const userGetOne = async (id) => {
    const { data } = await authInstance.get(`order/user/getone/${id}`)
    return data
}

/*
 * для неавторизованого користувача
 */

// створити нове замовлення
export const guestCreate = async (body) => {
    const { data } = await guestInstance.post('order/guest/create', body)
    return data
}

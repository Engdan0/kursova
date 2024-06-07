import OrderModel from '../models/Order.js'
import BasketModel from '../models/Basket.js'
import UserModel from '../models/User.js'
import AppError from '../errors/AppError.js'

class Order {
    adminCreate = async (req, res, next) => {
        await this.create(req, res, next, 'admin')
    }

    userCreate = async (req, res, next) => {
        await this.create(req, res, next, 'user')
    }

    guestCreate = async (req, res, next) => {
        await this.create(req, res, next, 'guest')
    }

    async create(req, res, next, type) {
        try {
            const {name, email, phone, address, comment = null} = req.body
            // дані для створення замовлення
            if (!name) throw new Error("Не вказано ім'я покупця")
            if (!email) throw new Error('Не вказано email покупця')
            if (!phone) throw new Error('Не вказано телефон покупця')
            if (!address) throw new Error('Не вказано адрес доставки')

            let items, userId = null
            if (type === 'admin') {
                // коли замовлення робе адмін, id користувача та склад замовлення в тілі запита
                if (!req.body.items) throw new Error('Не вказано склад замовлення')
                if (req.body.items.length === 0) throw new Error('Не вказано склад замовлення')
                items = req.body.items
                // перевіряєм існування користувача
                userId = req.body.userId ?? null
                if (userId) {
                    await UserModel.getOne(userId) // виключення, якщо не знайдено
                }
            } else {
                // коли замовлення робить звичайний користувач (авторизований або ні), склад
                // замовлення отримуєм з кошика, а id користувача з req.auth.id (якщо є)
                if (!req.signedCookies.basketId) throw new Error('Ваш кошик пустий')
                const basket = await BasketModel.getOne(parseInt(req.signedCookies.basketId))
                if (basket.products.length === 0) throw new Error('Ваш кошик пустий')
                items = basket.products
                userId = req.auth?.id ?? null
            }

            // все готово, можна створювати
            const order = await OrderModel.create({
                name, email, phone, address, comment, items, userId
            })
            // тепер треба очистити кошик
            await BasketModel.clear(parseInt(req.signedCookies.basketId))
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetAll(req, res, next) {
        try {
            const orders = await OrderModel.getAll()
            res.json(orders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetUser(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не вказано id користувача')
            }
            const order = await OrderModel.getAll(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не вказано id замовлення')
            }
            const order = await OrderModel.getOne(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminDelete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не вказано id замовлення')
            }
            const order = await OrderModel.delete(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async userGetAll(req, res, next) {
        try {
            const orders = await OrderModel.getAll(req.auth.id)
            res.json(orders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async userGetOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не вказано id замовлення')
            }
            const order = await OrderModel.getOne(req.params.id, req.auth.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Order()
import { Basket as BasketMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { BasketProduct as BasketProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.products = []
    if (basket.products) {
        data.products = basket.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.basket_product.quantity
            }
        })
    }
    return data
}

class Basket {
    async getOne(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: ProductMapping, attributes: ['id', 'name', 'price']},
            ],
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        return pretty(basket)
    }

    async create() {
        const basket = await BasketMapping.create()
        return pretty(basket)
    }

    async append(basketId, productId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            attributes: ['id'],
            include: [
                {model: ProductMapping, attributes: ['id', 'name', 'price']},
            ]
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        // перевіряємо чи є вже цей товар в кошику
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) { // є в кошику
            await basket_product.increment('quantity', {by: quantity})
        } else { // нема 
            await BasketProductMapping.create({basketId, productId, quantity})
        }
        // оновимо об'єкт кошика, щоб повернути оновленні дані
        await basket.reload()
        return pretty(basket)
    }

    async increment(basketId, productId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            basket = await BasketMapping.create()
        }
        // перевіряєм чи є товар в кошику
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) {
            await basket_product.increment('quantity', {by: quantity})
            // оновимо об'єкт кошика, щоб повернути оновленні дані
            await basket.reload()
        }
        return pretty(basket)
    }

    async decrement(basketId, productId, quantity) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            basket = await Basket.create()
        }
        // перевіряєм чи є товар в кошику
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) {
            if (basket_product.quantity > quantity) {
                await basket_product.decrement('quantity', {by: quantity})
            } else {
                await basket_product.destroy()
            }
            // оновимо об'єкт кошика, щоб повернути оновленні дані
            await basket.reload()
        }
        return pretty(basket)
    }

    async remove(basketId, productId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            basket = await Basket.create()
        }
        // перевіряємо чи є цей товар в кошику
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId, productId}
        })
        if (basket_product) {
            await basket_product.destroy()
            // оновимо об'єкт кошика, щоб повернути оновленні дані
            await basket.reload()
        }
        return pretty(basket)
    }

    async clear(basketId) {
        let basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (basket) {
            await BasketProductMapping.destroy({where: {basketId}})
            // оновимо об'єкт кошика, щоб повернути оновленні дані
            await basket.reload()
        } else {
            basket = await Basket.create()
        }
        return pretty(basket)
    }

    async delete(basketId) {
        const basket = await BasketMapping.findByPk(basketId, {
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            throw new Error('Кошик не знайдем у БД')
        }
        await basket.destroy()
        return pretty(basket)
    }
}

export default new Basket()
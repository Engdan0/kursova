import { BasketProduct as BasketProductMapping } from './mapping.js'
import { Basket as BasketMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class BasketProduct {
    async getAll(basketId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Кошик не знайден у БД')
        }
        const items = await BasketProductMapping.findAll({where: {basketId}})
        return items
    }

    async getOne(basketId, productId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Кошик не знайден у БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товару нема в кошику')
        }
        return item
    }

    async create(basketId, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Кошик не знайден у БД')
        }
        const {quantity = 1} = data
        const item = await BasketProductMapping.create({basketId, productId, quantity})
        return item
    }

    async update(basketId, productId, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Кошик не знайден у БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товару нема в кошику')
        }
        if (data.quantity) {
            await item.update({quantity})
        } else if (data.increment) {
            await item.increment('quantity', {by: data.increment})
        } else if (data.decrement) {
            await item.decrement('quantity', {by: data.decrement})
        }
        return item
    }

    async delete(basketId, productId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Кошик не знайден у БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товару нема в кошику')
        }
        await item.destroy()
        return item
    }
}

export default new BasketProduct()
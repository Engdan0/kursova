import BasketProductModel from '../models/BasketProduct.js'
import AppError from '../errors/AppError.js'

const check = async (req, res, next) => {
    try {
        if (!req.signedCookies.basketId) {
            throw new Error('Кошик ще не створен')
        }
        const exist = await BasketModel.isExist(req.signedCookies.basketId)
        if (!exist) {
            res.clearCookie('basketId')
            throw new Error('Кошин не знайдено в БД')
        }
    } catch(e) {
        next(AppError.badRequest(e.message))
    }
}

class BasketProduct {
    async getAll(req, res, next) {
        await check(req, res, next) // перевіряєм існування кошика
        try {
            const products = await BasketProductModel.getAll(req.signedCookies.basketId)
            res.json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        await check(req, res, next) // перевіряєм існування кошика
        try {
            if (!req.params.productId) {
                throw new Error('Не вказано id товару')
            }
            const item = await BasketProductModel.create(
                req.signedCookies.basketId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        await check(req, res, next) // перевіряєм існування кошика
        try {
            if (!req.params.productId) {
                throw new Error('Не вказано id товару')
            }
            const item = await BasketProductModel.update(
                req.signedCookies.basketId,
                req.params.productId,
                req.body
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        await check(req, res, next) // перевіряєм існування кошика
        try {
            if (!req.params.productId) {
                throw new Error('Не вказано id товару')
            }
            const item = await BasketProductModel.delete(
                req.signedCookies.basketId,
                req.params.productId,
            )
            res.json(item)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new BasketProduct()
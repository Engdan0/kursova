import { Brand as BrandMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Brand {
    async getAll() {
        const brands = await BrandMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return brands
    }

    async getOne(id) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('Видавництво не знайдено у БД')
        }
        return brand
    }

    async create(data) {
        const {name} = data
        const exist = await BrandMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Таке видавництво вже є')
        }
        const brand = await BrandMapping.create({name})
        return brand
    }

    async update(id, data) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('Видавництво не знайдено у БД')
        }
        const {name = brand.name} = data
        await brand.update({name})
        return brand
    }

    async delete(id) {
        const brand = await BrandMapping.findByPk(id)
        if (!brand) {
            throw new Error('Видавництво не знайдено у БД')
        }
        await brand.destroy()
        return brand
    }
}

export default new Brand()
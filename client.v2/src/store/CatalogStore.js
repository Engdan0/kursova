import { makeAutoObservable } from 'mobx'

class CatalogStore {
    _categories = []
    _brands = []
    _products = []
    _category = null // обрана категорія
    _brand = null // обране видавництво
    _page = 1 // поточна сторінка
    _count = 0 // скільки всього товарів
    _limit = 8 // товарів на сторінку

    constructor() {
        makeAutoObservable(this)
    }

    get categories() {
        return this._categories
    }

    get brands() {
        return this._brands
    }

    get products() {
        return this._products
    }

    get category() {
        return this._category
    }

    get brand() {
        return this._brand
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всього сторінок
        return Math.ceil(this.count / this.limit)
    }

    set categories(categories) {
        this._categories = categories
    }

    set brands(brands) {
        this._brands = brands
    }

    set products(products) {
        this._products = products
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set brand(id) {
        this.page = 1
        this._brand = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore
import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database

/*
 * Опис моделей
 */

// модель «Користувач», таблиця БД «users»
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

// модель «Кошик», таблиця БД «baskets»
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// зв'язок помеж кошиком та товаром через проміжну таблицю «basket_products»
// у цієї таблиці буде составний первинний ключ (basket_id + product_id)
const BasketProduct = sequelize.define('basket_product', {
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

// модель «Товар», таблиця БД «products»
const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    image: {type: DataTypes.STRING, allowNull: false},
})

// модель «Категорія», таблиця БД «categories»
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// модель «Видавництво», таблиця БД «brands»
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// зв'язок поміж товаром та користувачем через проміжну таблицю «rating»
// у цієї таблиці буде составний первинний ключ (product_id + user_id)
const Rating = sequelize.define('rating', {
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

// властивості товара, у одного товара може бути багато властивостей
const ProductProp = sequelize.define('product_prop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.STRING, allowNull: false},
})

// модель «Замовлення», таблиця БД «orders»
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    comment: {type: DataTypes.STRING},
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

// позиції замовлення, в одному замовленні може бути кілька позицій (товарів)
const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})

/*
 * Опис зв'язків
 */

// зв'язок many-to-many товарів та кошиків через проміжну таблицю basket_products;
// товар може бути в декількох кошиках, в кошику може бути декілька товарів
Basket.belongsToMany(Product, { through: BasketProduct, onDelete: 'CASCADE' })
Product.belongsToMany(Basket, { through: BasketProduct, onDelete: 'CASCADE' })

// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// це забезпече можливість будь-яких include при запитах findAll, findOne, findByPk
Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)
Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

// зв'язок категорії з товарами: в категорії може бути декілька товарів, але
// кожен товар може належити лише одній категорії
Category.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Category)

// зв'язок бренда з товарами: у бренда може бути багато товарів, але кожен товар
// може належати лише одному бренду
Brand.hasMany(Product, {onDelete: 'RESTRICT'})
Product.belongsTo(Brand)

// зв'язок many-to-many товарів та користувачів через проміжну таблицю rating;
// за один товар можуть проголосувати декілька зареєстрованих користувачів,
// один користувач може проголосувати за декілька товарів
Product.belongsToMany(User, {through: Rating, onDelete: 'CASCADE'})
User.belongsToMany(Product, {through: Rating, onDelete: 'CASCADE'})

// super many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
// це забезпечить можлиість будь-яких include при запитах findAll, findOne, findByPk
Product.hasMany(Rating)
Rating.belongsTo(Product)
User.hasMany(Rating)
Rating.belongsTo(User)

// зв'язок товара з його властивостями: у товара може бути декілька властивостей, але
// кожна властивість зв'язана лише з одним товаром
Product.hasMany(ProductProp, {as: 'props', onDelete: 'CASCADE'})
ProductProp.belongsTo(Product)

// зв'язок замовлення з позиціями: в замовленні може бути декілька позицій, але
// кожна позиція зв'язана лише з одним замовленням
Order.hasMany(OrderItem, {as: 'items', onDelete: 'CASCADE'})
OrderItem.belongsTo(Order)

// зв'язок замовлення з користувачами: у користувача може бути декілька замовлень,
// але замовлення може належити лише одному користувачу
User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)

export {
    User,
    Basket,
    Product,
    Category,
    Brand,
    Rating,
    BasketProduct,
    ProductProp,
    Order,
    OrderItem
}

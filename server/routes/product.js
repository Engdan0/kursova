import express from 'express'
import ProductController from '../controllers/Product.js'
import ProductPropController from '../controllers/ProductProp.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

/*
 * Товари
 */

// список товарів обраної категорії и обраног видавництва
router.get('/getall/categoryId/:categoryId([0-9]+)/brandId/:brandId([0-9]+)', ProductController.getAll)
// список товарів обраної категорії
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
// список товарів обраного видавництва
router.get('/getall/brandId/:brandId([0-9]+)', ProductController.getAll)
// список усіх товарів каталога
router.get('/getall', ProductController.getAll)
// отримати один товар каталога
router.get('/getone/:id([0-9]+)', ProductController.getOne)
// створити товар каталога — потрібні права адміна
router.post('/create', /*authMiddleware, adminMiddleware,*/ ProductController.create)
// оновити товар каталога  — потрібні права адміна
router.put('/update/:id([0-9]+)', /*authMiddleware, adminMiddleware,*/ ProductController.update)
// видалити товар каталога  — потрібні права адміна
router.delete('/delete/:id([0-9]+)', /*authMiddleware, adminMiddleware,*/ProductController.delete)

/*
 * Властивості
 */

// список властивостей товара
router.get('/:productId([0-9]+)/property/getall', ProductPropController.getAll)
// одна властивість товара
router.get('/:productId([0-9]+)/property/getone/:id([0-9]+)', ProductPropController.getOne)
// створити властивість товара
router.post(
    '/:productId([0-9]+)/property/create',
    authMiddleware,
    adminMiddleware,
    ProductPropController.create
)
// оновити властивість товара
router.put(
    '/:productId([0-9]+)/property/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropController.update
)
// видалити властивість товара
router.delete(
    '/:productId([0-9]+)/property/delete/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    ProductPropController.delete
)

export default router
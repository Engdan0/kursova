import express from 'express'
import OrderController from '../controllers/Order.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

/*
 * только для адміну магазину
 */

// отримати список усіх замовлень магазину
router.get(
    '/admin/getall',
    authMiddleware, adminMiddleware,
    OrderController.adminGetAll
)
// отримати список замовлень юзера
router.get(
    '/admin/getall/user/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    OrderController.adminGetUser
)
// отримати замовлення по id
router.get(
    '/admin/getone/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    OrderController.adminGetOne
)
// створити нове замовлення
router.post(
    '/admin/create',
    authMiddleware, adminMiddleware,
    OrderController.adminCreate
)
// видалити замовлення по id
router.delete(
    '/admin/delete/:id([0-9]+)',
    authMiddleware, adminMiddleware,
    OrderController.adminDelete
)

/*
 * для авторизованного юзера
 */

// отримати всі замовлення юзера
router.get(
    '/user/getall',
    authMiddleware,
    OrderController.userGetAll
)
// отримати одне замовлення юзера
router.get(
    '/user/getone/:id([0-9]+)',
    authMiddleware,
    OrderController.userGetOne
)
// створити нове замовлення
router.post(
    '/user/create',
    authMiddleware,
    OrderController.userCreate
)

/*
 * для неавторизованного юзера
 */

// створити нове замовлення
router.post(
    '/guest/create',
    OrderController.guestCreate
)

export default router
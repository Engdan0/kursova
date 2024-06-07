import jwt from 'jsonwebtoken'
import AppError from '../errors/AppError.js'

const decode = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return decoded
    } catch(e) {
        throw new Error('Неправильний підпис токена')
    }
}

const auth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1] // Bearer token
        if (!token) {
            throw new Error('Потрібна авторизація')
        }
        const decoded = decode(token)
        req.auth = decoded
        next()
    } catch (e) {
        next(AppError.forbidden(e.message))
    }
}

export default auth
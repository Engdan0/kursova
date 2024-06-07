import { Sequelize } from 'sequelize'

export default new Sequelize(
    process.env.DB_NAME, // база даних
    process.env.DB_USER, // користувач
    process.env.DB_PASS, // пароль
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            // у бд будуть поля created_at та updated_at
            underscored: true
        },
        logging: false,
        timezone: 'Europe/Moscow',
    }
)
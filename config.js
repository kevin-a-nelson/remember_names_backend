require('dotenv').config()

const { Pool } = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    // connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    // ssl: isProduction,

    // Mock Production Pool
    connectionString: 'postgres://pqmuccjsjynjda:60571e70cb1cae471c6b789850722cac15231ef1e21b1e0b38d9d48cc6300666@ec2-35-171-31-33.compute-1.amazonaws.com:5432/d6vkrof9dlk4ll',
    ssl: true

})

module.exports = { pool }
const mysql = require('mysql2')
    , { dbConfig } = require('./index')

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
}).promise()

module.exports = pool;
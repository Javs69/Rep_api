const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user:     process.env.USER      ,
    password: process.env.PASSWORD  ,
    host:     process.env.DB_HOST   ,
    port:     process.env.DB_PORT   ,
    database: process.env.DB_NAME   ,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

/** 

const {Pool} = require ('pg');
require('dotenv').config();

const poll = new Pool({
    user: "postgres",
    password: "123",
    host: "localhost",
    port: "5432",
    database: "Nombre",
});

MediaSourceHandle.exports = {
    query:
    (text, params) =>
        Pool.query(text, params)
}*/
import sqlite3 from '../config/sqlite3.js'
import knexFn from 'knex'
const knex = knexFn(sqlite3)

export default class CartSqlite3 {

    constructor() {
        this.createTable = this.createTableProd()
    }

    createTableProd = async () => {
        try {
            await knex.schema.hasTable('carrito')
            return await knex.schema.createTableIfNotExists('carrito', table => {
                table.increments('id').primary()
                table.string('title', 50).notNullable()
                table.integer('price').notNullable()
                table.string('thumbnail', 150).notNullable()
                table.integer('stock').notNullable()
                table.string('description', 250).notNullable()
                table.string('code', 20).notNullable()
                table.timestamp('timestamp')
            })
        } catch (error) {
            console.log(error)

        }
    }

    add = async (req, res) => {
        try {
            if (!req.body) {
                res.status(404).send('Completar nuevo título y precio de producto')
            }
            let data = await { ...req.body }
            await knex('carrito').insert({
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock,
                description: data.description
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    get = async (req, res) => {
        try {
            const productos = await knex('carrito').select()
            res.status(200).json(productos)
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            let id = req.params.id
            if (!id) {
                res.status(404).json(`No se encontró producto con ID: ${id}`)
            } else {
                const productWithId = await knex('carrito').select().where('id', id)
                res.status(200).json(productWithId)
            }
        } catch (error) {
            console.log(error)
        }
    }

    delete = async (req, res) => {
        try {
            if (req) {
                let id = req.params.id
                return await knex('carrito').select().where('id', id).del()
                    .then(() => {
                        res.status(200).json(`Se eliminó producto con ID: ${id}`)
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }

}
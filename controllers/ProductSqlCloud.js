import mysqlCloud from '../config/mysqlCloud.js'
import knexFn from 'knex'
const knex = knexFn(mysqlCloud)

export default class ProductSqlCloud {

    constructor() {
        this.createTable = this.createTableProd()
    }

    createTableProd = async () => {
        try {
            await knex.schema.hasTable('productos')
            return await knex.schema.createTableIfNotExists('productos', table => {
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
                res.status(404).send('Complete todos los campos del producto')
            }
            let data = await { ...req.body }
            await knex('productos').insert({
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
            const productos = await knex('productos').select()
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
                const productWithID = await knex('productos').select().where('id', id)
                res.status(200).json(productWithID)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getByName = async (req, res) => {
        try {
            if (!req.params.title) {
                res.status(404).json(`Producto no encontrado con nombre: ${req.params.title}`)
            } else {
                const productWithName = await knex('productos').select().where('title', req.params.title)
                res.status(200).json(productWithName)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getByCode = async (req, res) => {
        try {
            if (!req.params.code) {
                res.status(404).json(`Producto no encontrado con nombre: ${req.params.code}`)
            } else {
                const productWithCode = await knex('productos').select().where('code', req.params.code)
                res.status(200).json(productWithCode)
            }
        } catch (error) {
            console.log(error)
        }
    }

    orderByPrice = async (req, res) => {
        try {
            if (!req.params.condition) {
                res.status(404).json(`Error`)
            } else {
                const productsbyPrice = await knex('productos').select().orderBy('price', req.params.condition)
                res.status(200).json(productsbyPrice)
            }
        } catch (error) {
            console.log(error);
        }
    }

    orderByStock = async (req, res) => {
        try {
            if (!req.params.stock) {
                res.status(404).json(`Error`)
            } else {
                const productsByStock = await knex('productos').select().orderBy('stock', req.params.stock)
                res.status(200).json(productsByStock)
            }
        } catch (error) {
            console.log(error);
        }
    }

    drop = async (req, res) => {
        try {
            if (req) {
                let id = req.params.id
                return await knex('productos').select().where('id', id).del()
                    .then(() => {
                        res.status(200).json(`Se eliminó producto con ID: ${id}`)
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }

    update = async (req, res) => {
        try {
            if (req.body.title == "" || req.body.price == "") {
                res.status(400).json("Completar nuevo título y precio de producto")
            } else {
                const id = req.params.id
                await knex('productos').where('id', id).update({
                    title: req.body.title,
                    price: req.body.price,
                    thumbnail: req.body.thumbnail,
                    stock: req.body.stock,
                    code: req.body.code,
                    description: req.body.description
                })
                res.status(200).json(`El producto "${req.body.title}" fue actualizado con éxito`)
            }
        } catch (error) {
            console.log(error)
        }

    }
}
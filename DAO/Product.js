import ProductMongo from '../controllers/ProductMongo.js'
import ProductMemory from '../controllers/ProductMemory.js'
import ProductFirebase from '../controllers/ProductFirebase.js'
import ProductFS from '../controllers/ProductFS.js'
import ProductSqlLocal from '../controllers/ProductSqlLocal.js'
import ProductSqlCloud from '../controllers/ProductSqlCloud.js'
import ProductSqlite3 from '../controllers/ProductSqlite3.js'

export default class Product {

    database

    constructor(number) {
        switch (number) {

            case 0:
                this.database = new ProductMemory()
                break
            case 1:
                this.database = new ProductFS()
                break
            case 2:
                this.database = new ProductSqlLocal()
                break
            case 3:
                this.database = new ProductSqlCloud()
                break
            case 4:
                this.database = new ProductSqlite3()
                break
            case 5:
                this.database = new ProductMongo('local')//'local' o 'cloud'
                break
            case 6:
                this.database = new ProductFirebase('productos')
                break
        }
    }

    add = async (req, res) => {
        try {
            return await this.database.add(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    get = async (req, res) => {
        try {
            return await this.database.get(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    getById = async (req, res) => {
        try {
            return await this.database.getById(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    getByName = async (req, res) => {
        try {
            return await this.database.viewByName(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    getByCode = async (req, res) => {
        try {
            return await this.database.viewByCode(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    orderByPrice = async (req,res) => {
        try {
            return await this.database.orderByPrice(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    orderByStock = async (req,res) => {
        try {
            return await this.database.orderByStock(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    drop = async (req, res) => {
        try {
            return await this.database.drop(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    update = async (req, res) => {
        try {
            return await this.database.update(req, res)
        } catch (error) {
            console.error(error)
        }
    }
}
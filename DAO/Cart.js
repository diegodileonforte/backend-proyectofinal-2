import CartMongo from '../controllers/CartMongo.js'
import CartMemory from '../controllers/CartMemory.js'
import CartFs from '../controllers/CartFS.js'
import CartSqlLocal from '../controllers/CartSqlLocal.js'
import CartSqlCloud from '../controllers/CartSqlCloud.js'
import CartSqlite3 from '../controllers/CartSqlite3.js'
import CartFirebase from '../controllers/CartFirebase.js'

export default class Cart {
    database

    constructor(number) {
        switch (number) {
            case 0:
                this.database = new CartMemory()
                break;
            case 1:
                this.database = new CartFs()
                break;
            case 2:
                this.database = new CartSqlLocal()
                break;
            case 3:
                this.database = new CartSqlCloud()
                break;
            case 4:
                this.database = new CartSqlite3()
                break;
            case 5:
                this.database = new CartMongo('local') //'local' o 'cloud'
                break;
            case 6:
                this.database = new CartFirebase('carrito')
                break
        }
    }

    add = async (req, res) => {
        try {
            return await this.database.addCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    get = async (req, res) => {
        try {
            return await this.database.getCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    getById = async (req, res) => {
        try {
            return await this.database.getByIdCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }

    delete = async (req, res) => {
        try {
            return await this.database.deleteCart(req, res)
        } catch (error) {
            console.error(error)
        }
    }
}



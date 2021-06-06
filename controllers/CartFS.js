import fs from 'fs'
const CART = []

export default class CartFs {

    constructor() {
        this.createJson = this.readJSON
    }

    readJSON = () => {
        if (!fs.existsSync('cart.json')) {
            fs.writeFileSync('cart.json', JSON.stringify(CART))
        } else {
            let data = fs.readFileSync('cart.json')
            return JSON.parse(data)
        }
    }

    saveJSON = (data) => {
        let stringifyData = JSON.stringify(data)
        fs.writeFileSync('cart.json', stringifyData)
    }


    add = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'Error al agregar nuevo producto' })
            } else {
                let newProduct = { ...req.body }
                CART.push(newProduct)
                this.saveJSON(CART)
                res.status(200).json(newProduct)
            }
        } catch (err) {
            console.log(err)
        }
    }

    get = async (req, res) => {
        try {
            const cartView = await this.readJSON()
            if (!cartView) { res.status(404).send({ error: 'No existen productos en el carrito' }) }
            res.status(200).json(cartView)
        } catch (error) {
            console.log(error)
        }

    }

    getById = async (req, res) => {
        try {
            const data = await this.readJSON()
            const id = await req.params.id
            let productWithId = await data.find(prod => prod.id == parseInt(id))
            if (productWithId) { return res.json(productWithId) }
            res.status(404).json({ error: 'No se encontró producto con ID: ${id}' })
        } catch (error) {
            console.log(error)
        }

    }

    delete = async (req, res) => {

        try {
            const id = await req.params.id
            let cartView = await this.readJSON()
            let productsLeft = await cartView.filter(prod => prod.id !== parseInt(id))
            this.saveJSON(productsLeft)
            CART.push(productsLeft)
            res.json(productsLeft)
            if (!productsLeft) { return { error: 'No se encontró producto con ID: ${id}' } }
        } catch (error) {
            console.log(error)
        }

    }

}
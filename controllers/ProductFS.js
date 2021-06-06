import fs from 'fs'
const productArray = []

export default class ProductFS {

    constructor() {
        this.createJson = this.readJSON
    }

    readJSON = () => {
        if (!fs.existsSync('products.json')) {
            fs.writeFileSync('products.json', JSON.stringify(productArray))
        } else {
            const data = fs.readFileSync('products.json')
            return JSON.parse(data)
        }
    }

    saveJSON = (data) => {
        let stringifyData = JSON.stringify(data)
        fs.writeFileSync('products.json', stringifyData)
    }

    add = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'Error al agregar nuevo producto' })
            } else {
                const id = productArray.length + 1
                const timestamp = Date.now()
                const newProduct = { ...req.body, id, timestamp }
                productArray.push(newProduct)
                this.saveJSON(productArray)
                res.status(200).json(newProduct)
            }
        } catch (error) {
            console.log(error)
        }
    }

    get = async (req, res) => {
        try {
            const data = await this.readJSON()
            if (!data) { res.status(404).send({ error: 'No existen productos cargados' }) }
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }

    }

    getById = async (req, res) => {
        try {
            const data = await this.readJSON()
            const id = await req.params.id
            let productWithId = await data.find(prod => prod.id == parseInt(id))
            if (productWithId) { return res.status(200).json(productWithId) }
            res.status(404).json({ error: `No se encontró producto con ID: ${id}` })
        } catch (error) {
            console.log(error)
        }
    }

    getByName = async (req, res) => {
        try {
            const data = await this.readJSON()
            const title = await req.params.title
            let productWithTitle = await data.find(prod => prod.title == title)
            if (productWithTitle) { return res.status(200).json(productWithTitle) }
            res.status(404).json({ error: `Producto con nombre ${title} no encontrado` })
        } catch (error) {
            console.log(error)
        }
    }

    getByCode = async (req, res) => {
        try {
            const data = await this.readJSON()
            const code = await req.params.code
            let productWithCode = await data.find(prod => prod.code == code)
            if (productWithCode) { return res.status(200).json(productWithCode) }
            res.status(404).json({ error: `Producto con código ${code} no encontrado` })
        } catch (error) {
            console.log(error)
        }
    }

    orderByPrice = async (req, res) => {
        const condition = await req.params.condition
        const data = await this.readJSON()

        function order(param) {
            if (param == 'asc') {
                res.status(200).json(data.sort(function (a, b) { return a.price - b.price }))
            }
            else if (param == 'desc') {
                res.status(200).json(data.sort(function (b, a) { return a.price - b.price }))
            } else {
                res.status(400).json({ mensaje: 'Error' })
            }
        }

        try {
            order(condition)
        } catch (error) {
            console.log(error)
        }
    }

    orderByStock = async (req, res) => {
        const stock = await req.params.stock
        const data = await this.readJSON()

        function order(param) {
            if (param == 'asc') {
                res.status(200).json(data.sort(function (a, b) { return a.price - b.price }))
            }
            else if (param == 'desc') {
                res.status(200).json(data.sort(function (b, a) { return a.price - b.price }))
            } else {
                res.status(400).json({ mensaje: 'Error' })
            }
        }

        try {
            order(stock)
        } catch (error) {
            console.log(error)
        }
    }

    drop = async (req, res) => {
        try {
            const id = await req.params.id
            const data = await this.readJSON()
            const productsLeft = await data.filter(prod => prod.id !== parseInt(id))
            this.saveJSON(productsLeft)
            productArray.push(productsLeft)
            res.status(200).json(productsLeft)
            if (!productsLeft) { return { error: `No se encontró producto con ID: ${id}` } }
        } catch (error) {
            console.log(error)
        }
    }

    update = async (req, res) => {
        try {
            const id = await req.params.id
            const data = await { ...req.body }
            let productList = await this.readJSON()
            productList = await productList.map(prod => {
                if (prod.id == parseInt(id)) {
                    prod.title = data.title
                    prod.price = data.price
                    prod.stock = data.stock
                    prod.thumbnail = data.thumbnail
                    prod.code = data.code
                    prod.description = data.description
                }
                this.saveJSON(productList)
                productArray.push(productList)
                res.status(200).json(productList)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
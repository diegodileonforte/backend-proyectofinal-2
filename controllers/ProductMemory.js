const PRODUCTS = []

export default class ProductMemory {

    add = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'Error al agregar nuevo producto', error })
            }
            const data = await { ...req.body }
            const id = PRODUCTS.length + 1
            const timestamps = Date.now()
            let newProduct = await { ...data, id, timestamps }
            PRODUCTS.push(newProduct)
            return res.status(200).json(newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    get = (req, res) => {
        try {
            if (PRODUCTS.length < 1) {
                return res.status(400).json({ mensaje: "No existen productos cargados" })
            };
            return res.status(200).json(PRODUCTS)
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'No se especificó ID de producto buscado', error });
            } else {
                const id = await req.params.id
                let selectedProduct = await PRODUCTS.find(prod => prod.id == parseInt(id))
                return res.status(200).json(selectedProduct)
            }
        } catch (error) {
            console.log(error)
        }

    }

    getByName = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'Ocurrió un error', error });
            } else {
                const title = await req.params.title
                let productWithTitle = await PRODUCTS.find(prod => prod.title == title)
                return res.status(200).json(productWithTitle)
            }
        } catch (error) {
            console.log(error)
        }
    }

    getByCode = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'Ocurrió un error', error });
            } else {
                const code = await req.params.code
                let productWithCode = await PRODUCTS.find(prod => prod.code == code)
                return res.status(200).json(productWithCode)
            }
        } catch (error) {
            console.log(error)
        }
    }

    orderByPrice = async (req, res) => {
        const condition = await req.params.condition
        
        function order(param) {
            if (param == 'asc') {
                res.status(200).json(PRODUCTS.sort(function (a, b) { return a.price - b.price }))
            }
            else if (param == 'desc') {
                res.status(200).json(PRODUCTS.sort(function (b, a) { return a.price - b.price }))
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
        
        function order(param) {
            if (param == 'asc') {
                res.status(200).json(PRODUCTS.sort(function (a, b) { return a.stock - b.stock }))
            }
            else if (param == 'desc') {
                res.status(200).json(PRODUCTS.sort(function (b, a) { return a.stock - b.stock }))
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
            const id = req.params.id
            const itemIndex = PRODUCTS.findIndex(prod => prod.id == parseInt(id))
            if (itemIndex !== -1) {
                let prodDrop = PRODUCTS.splice(itemIndex, 1)
                return res.status(200).json(prodDrop)
            } else { return { error: `Producto con id: ${id} no encontrado`} }
        } catch (error) {
            console.log(error)
        }
    }

    update = async (req, res) => {
        try {
            const id = await req.params.id
            const newProduct = { id, ... req.body }
            const index = PRODUCTS.findIndex(p => p.id == id)
            if (index !== -1) {
                PRODUCTS.splice(index, 1, newProduct)
                return res.status(200).json(newProduct)
            } else {
                return { error: `Producto con id: ${id} no encontrado`}
            }
        } catch (error) {
            console.log(error)
        }
    }
}


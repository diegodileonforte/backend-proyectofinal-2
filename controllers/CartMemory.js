let CART = []

export default class CartMemory {

    add = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'Error al agregar nuevo producto', error })
            }
            const data = await { ...req.body }
            const chartTimestamp = Date.now()
            let newProduct = await { ...data, chartTimestamp}
            CART.push(newProduct)
            return res.status(200).json(newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    get = (req, res) => {
        try {
            if (CART.length < 1) {
                return res.status(400).json({ mensaje: "No existen productos en el carrito" })
            };
            return res.status(200).json(CART);
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
                let selectedProduct = await CART.find(prod => prod.id == parseInt(id))
                return res.status(200).json(selectedProduct)
            }
        } catch (error) {
            console.log(error)
        }

    }

    delete = async (req, res) => {
        try {
            const id = req.params.id
            const itemIndex = CART.findIndex(prod => prod.id == parseInt(id))
            if (itemIndex !== -1) {
                let prodDrop = CART.splice(itemIndex, 1)
                return res.status(200).json(prodDrop)
            } else { return { error: 'producto no encontrado' } }
        } catch (error) {
            console.log(error)
        }
    }

}

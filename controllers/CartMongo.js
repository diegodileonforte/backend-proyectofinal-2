import MongooseConnection from '../config/mongoose.js'
import CartModel from '../models/cartSchema.js'

export default class CartMongo extends MongooseConnection {

    add = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ mensaje: 'Error al agregar nuevo producto', error })
            } else {
                const data = await { ...req.body }
                const newProduct = await CartModel.create(data)
                return res.status(200).json(newProduct)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    get = async (req, res) => {
        try {
            const prod = await CartModel.find({})
            return res.status(200).json(prod)

        } catch (error) {
            return res.status(400).json({ mensaje: 'No existen productos cargados', error })
        }
    }

    getById = async (req, res) => {
        const id = req.params.id
        try {
            if (id === "") {
                return res.status(404).json({ mensaje: 'No se especificó ID de producto buscado', error })
            } else {
                const selectedProduct = await CartModel.findOne({ id })
                return res.status(200).json(selectedProduct)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    delete = async (req, res) => {
        const id = req.params.id
        try {
            if (id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado' })
            } else {
                const productToDelete = await CartModel.findByIdAndDelete({ id })
                if (!productToDelete) { return res.status(404).json({ mensaje: 'Producto con id: ${id} no encontrado' }) }
                return res.status(200).json(productToDelete)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }


}
import ProductModel from '../models/productSchema.js'
import MongooseConnection from '../config/mongoose.js'

export default class ProductMongo extends MongooseConnection {

    add = async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ mensaje: 'Error al agregar nuevo producto' })
            } else {
                const data = await { ...req.body }
                const newProduct = await ProductModel.create(data)
                return res.status(200).json(newProduct)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    get = async (req, res) => {
        try {
            const products = await ProductModel.find({})
            return res.status(200).json(products)

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
                const selectedProduct = await ProductModel.findOne({ id })
                return res.status(200).json(selectedProduct)
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    getByName = async (req, res) => {
        try {
            await ProductoModel.find({ title: { $eq: req.params.title } }, (error, data) => {
                if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json(data)
                }
            });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    getByCode = async (req, res) => {
        try {
            await ProductoModel.find({ code: { $eq: req.params.code } }, (error, data) => {
                if (error) {
                    res.status(400).json({ mensaje: 'Error', error })
                } else {
                    return res.status(200).json(data)
                }
            });
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    orderByPrice = async (req, res) => {
        const condition = await req.params.condition

        async function order(param) {
            if (param == 'asc') {
                const asc = await ProductoModel.find().sort({ price: 1 })
                res.status(200).json(asc)
            }
            else if (param == 'desc') {
                const desc = await ProductoModel.find().sort({ price: -1 })
                res.status(200).json(desc)
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

        async function order(param) {
            if (param == 'asc') {
                const asc = await ProductoModel.find().sort({ stock: 1 })
                res.status(200).json(asc)
            }
            else if (param == 'desc') {
                const desc = await ProductoModel.find().sort({ stock: -1 })
                res.status(200).json(desc)
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
        const id = req.params.id
        try {
            if (id === "") {
                return res.status(404).json({ mensaje: 'Producto no encontrado' })
            } else {
                const productToDrop = await ProductModel.findByIdAndDelete({ id })
                if (!productToDrop) { return res.status(404).json({ mensaje: `Producto con id: ${id} no encontrado` }) } else {
                    return res.status(200).json(productToDrop)
                }
            }
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    };

    update = async (req, res) => {

        const id = req.params.id
        const data = { ...req.body }

        try {
            const productToUpdate = await ProductModel.findByIdAndUpdate(id, data, { new: true });
            return res.status(200).json(productToUpdate)
        } catch (error) {
            return res.status(400).json({ mensaje: `Producto con id: ${id} no encontrado`, error })
        }
    }
}
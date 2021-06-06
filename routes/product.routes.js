import express from 'express'
import Product from '../DAO/Product.js'
const productsRoutes = express.Router()
const product = new Product(1)

//0 - Memory
//1 - FS
//2 - SQL Local
//3 - SQL Cloud (Clever Cloud)
//4 - SQLite3
//5 - MongoDB ('local' o 'cloud')
//6 - Firebase

productsRoutes.get('/', product.get)
productsRoutes.get('/:id', product.getById)
productsRoutes.get('/title/:title', product.getByName)
productsRoutes.get('/code/:code', product.getByCode)
productsRoutes.get('/price/:condition', product.orderByPrice)
productsRoutes.get('/stock/:stock', product.orderByStock)
productsRoutes.post('/', product.add)
productsRoutes.delete('/:id', product.drop)
productsRoutes.put('/:id', product.update)

export default productsRoutes
import express from 'express'
import Cart from '../DAO/Cart.js'
const cartRoutes = express.Router()
const cart = new Cart(1)

//0 - Memory
//1 - FS
//2 - SQL Local
//3 - SQL Cloud (Clever Cloud)
//4 - SQLite3
//5 - MongoDB ('local' o 'cloud')
//6 - Firebase

cartRoutes.get('/', cart.get);
cartRoutes.get('/:id', cart.getById);
cartRoutes.post('/', cart.add);
cartRoutes.delete('/:id', cart.delete);

export default cartRoutes
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const cartSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    title: { type: String },
    price: { type: Number },
    stock: { type: Number },
    thumbnail: { type: String },
    code: { type: String },
    description: { type: String }
})

const CartModel = mongoose.model('CartModel', cartSchema)
export default CartModel
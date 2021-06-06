import FirebaseConfig from '../config/firebase.js'

export default class CartFirebase extends FirebaseConfig {

    add = async (req, res) => {
        try {
            if (!req) {
                return res.status(400).json({ mensaje: 'Error al agregar nuevo producto', error }) 
            }
            const doc = this.query.doc()
            await doc.create({
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail,
                code: req.body.code,
                stock: req.body.stock,
                description: req.body.description,
                timestamps: Date.now(),
            })
            res.status(200).json({ mensaje: "Producto agregado al carrito" })
        } catch (error) {
            console.log(error)
        }
    }

    get = async (req, res) => {
        try {
            const querySnapshot = await this.query.get()
            const docs = querySnapshot.docs 
            const response = docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data().thumbnail,
                code: doc.data().code,
                stock: doc.data().stock,
                description: doc.data().description,
                timestamps: doc.data().timestamps
            }))
            console.log(response)
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (req, res) => {
        try {
            const id = await req.params.id
            const doc = this.query.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()
            response.id = id
            console.log(response)
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
        }

    }

    delete = async (req, res) => {
        try {
            const id = await req.params.id
            const doc = this.query.doc(`${id}`)
            await doc.delete()
            return res.status(200).json({ mensaje: 'Producto eliminado con éxito' })
        } catch (error) {
            console.log(error)
        }
    }
   
}


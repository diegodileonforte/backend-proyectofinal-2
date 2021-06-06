import FirebaseConfig from '../config/firebase.js'

export default class ProductFirebase extends FirebaseConfig {

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
            res.status(200).json({ mensaje: "Producto agregado con éxito" })
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
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
        }
    }

    getByName = async (req, res) => {
        try {
            const title = await req.params.title
            const doc = await this.query.where('title', '==', title).get()

            doc.forEach(doc => {
                console.log(doc.id, '=>', doc.data())
                const response = (doc.id, '=>', doc.data())
                response._id = doc.id
                return res.status(200).json(response)
            })

        } catch (error) {
            console.log(error)
        }
    }

    getByCode = async (req, res) => {
        try {
            const code = await req.params.code
            const doc = await this.query.where('code', '==', code).get()

            doc.forEach(doc => {
                console.log(doc.id, '=>', doc.data())
                const response = (doc.id, '=>', doc.data())
                response._id = doc.id
                return res.status(200).json(response)
            })

        } catch (error) {
            console.log(error)
        }
    }

    orderByPrice = async (req, res) => {
        
        const condition = req.params.condition
        try {
            const querySnapshot = await this.query.orderBy('price', condition).get()
            let docs = querySnapshot.docs
            const response = docs.map(doc => ({
                _id: doc.id,
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

    orderByStock = async (req, res) => {
        const stock = req.params.stock
        try {
            const querySnapshot = await this.query.orderBy('stock', stock).get()
            let docs = querySnapshot.docs
            const response = docs.map(doc => ({
                _id: doc.id,
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

    drop = async (req, res) => {
        try {
            const id = await req.params.id
            const doc = this.query.doc(`${id}`)
            await doc.delete()
            return res.status(200).json({ mensaje: 'Producto eliminado con éxito' })
        } catch (error) {
            console.log(error)
        }
    }

    update = async (req, res) => {
        try {
            const id = await req.params.id
            const doc = this.query.doc(`${id}`)
            let item = await doc.update({
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail,
                code: req.body.code,
                stock: req.body.stock,
                description: req.body.description
            })
            return res.status(200).json({ item })
        } catch (error) {
            console.log(error)
        }
    }
}


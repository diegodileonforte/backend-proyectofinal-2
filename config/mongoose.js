import mongoose from 'mongoose'

export default class MongooseConnection {

    constructor(storage) {
        this.connection = this.createConnection(storage);
    }

    createConnection(storage) {
        if (storage == 'local') {
            const url = 'mongodb://localhost:27017/ecommerce'
            const options = { 
                useNewUrlParser: true, 
                useCreateIndex: true, 
                useUnifiedTopology: true }
            mongoose.connect(url, options).then(
                () => { console.log('Conectado a MongoDB Local') },
                err => { err })
        } else if (storage == 'cloud') {
            const url = 'mongodb+srv://diegodileonforte:*****@cluster0.wnyby.mongodb.net/test?authSource=admin&replicaSet=atlas-2ugqp6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
            const options = { 
                useNewUrlParser: true, 
                useCreateIndex: true, 
                useUnifiedTopology: true }
            mongoose.connect(url, options).then(
                () => { console.log('Conectado a MongoDB Cloud') },
                err => { err }
            );
        } else {
            console.log('Indicar tipo de storage para MongoDB')
        }
    }
}
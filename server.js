import express from 'express'
import path from 'path'
const __dirname = path.resolve()

import productsRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/productos', productsRoutes)
app.use('/cart', cartRoutes)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http en puerto: ${server.address().port}`)

})
server.on("error", error => console.log(`Error en servidor ${error}`))

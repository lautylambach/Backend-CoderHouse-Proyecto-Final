const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
const routesProducts = require('./router/productsRoutes.js')
const routesCart = require('./router/cartRoutes.js')


server.on("error", error => console.log(`Error en servidor ${error}`))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routesProducts)
app.use('/api/cart', routesCart)

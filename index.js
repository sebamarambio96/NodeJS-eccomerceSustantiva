const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors())
const jsonParser = bodyParser.json() 

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
} )

//Retorna TODOS los productos a la venta
app.get('/products', (req, res) => {
    let data = fs.readFileSync('./data/products.json')
    let products = JSON.parse(data)
    res.json(products)
})

//Retorna UN producto según id
app.get('/product/:id', (req, res) => {
    //http://localhost:3000/product/2006 ejemplo
    console.log(req.params.id);
    let data = fs.readFileSync('./data/products.json')
    let products = JSON.parse(data)
    let product = {}

    //Las categorias estan en un rango númerico para facilitar su selección, debido a que la pagina no es tan grande solo lo hice ocn un rango de mil en vez de un número inicial u otra opción
    if (req.params.id < 2000) {
        product = products.categorias.mangas.filter(item => item.id === parseInt(req.params.id))
    } else if (req.params.id >= 2000 && req.params.id < 3000) {
        product = products.categorias.horror.filter(item => item.id === parseInt(req.params.id))
    } else if (req.params.id >= 3000 && req.params.id < 4000) {
        product = products.categorias.juvenil.filter(item => item.id === parseInt(req.params.id))
    }

    //si no existe ponemos un status(404)
    !product && res.status(404).json({ message: 'pet not found' })
    res.json(product)
})



app.listen(3000)
console.log(`Server on port 3000`)
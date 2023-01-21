const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const fs = require('fs')
const cors = require('cors')

app.use(cors())
const jsonParser = bodyParser.json() 

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

//Inserta una NUEVO usuario y verifica si el correo ya existe
app.post('/addUser/',jsonParser, (req, res) => {
    //http://localhost:3001/addUser/ ejemplo
    // console.log(req.query)
    let data = fs.readFileSync('./data/users.json')
    let users = JSON.parse(data)
    console.log(req.body);
    if (users.users.find(user => user.email === req.body.email)) {
        res.send('El correo ya tiene una cuenta asociada')
    }
    users.users.push(req.body)
    fs.writeFileSync('./data/users.json', JSON.stringify(users))
    res.send(users)
})

//Usuario ADMIN tiene falcutades para agregar, eliminar o modificar productos, tambien tiene permisos para eliminar usuarios de la base de datos
//ELIMINAR MASCOTA por nombre 💀
/* app.delete('/deletePetName/:namePet', (req, res) => {
    //http://localhost:3001/deletePetName/Benji ejemplo
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data)
    const petFound = pets.pets.find(pet => pet.name === req.params.namePet)
    if (!petFound) {
        res.status(404).json({ message: 'pet not found' })
    } else {
        pets = pets.pets.filter(pet => pet.name !== req.params.namePet)
        console.log(pets)
        //podemos enviar un codigo de estatus
        fs.writeFileSync('./data/mascotas.json', `{"pets": ${JSON.stringify(pets)}}`)
        res.sendStatus(204)
    }
})

//ELIMINAR MASCOTAS asociadas al rut del dueño 
app.delete('/deletePetRut/:ownerRut', (req, res) => {
    //http://localhost:3001/deletePetRut/11111111-1 ejemplo
    let data = fs.readFileSync('./data/mascotas.json')
    let pets = JSON.parse(data)
    const petFound = pets.pets.find(pet => pet.rut === req.params.ownerRut)
    if (!petFound) {
        res.status(404).json({ message: 'owner not found' })
    } else {
        pets = pets.pets.filter(pet => pet.rut !== req.params.ownerRut)
    console.log(pets)
    //podemos enviar un codigo de estatus
    fs.writeFileSync('./data/mascotas.json', `{"pets": ${JSON.stringify(pets)}}`)
    res.sendStatus(204)
    }
}) */

app.listen(3000)
console.log(`Server on port 3000`)
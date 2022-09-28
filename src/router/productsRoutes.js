const fs= require('fs')
const pathToFile = './src/data/products.json'
const express = require('express')
const router = express.Router()
const Manager = require('../controllers/ManagerProducts')
const manager =new Manager()


let products=[]


function fsData(){
    if(fs.existsSync(pathToFile)){
        fs.readFile(pathToFile,'utf-8', function (err, data){
            products= JSON.parse(data)
        })
        
        return products
                                     
    }else{
        fs.writeFileSync(pathToFile,JSON.stringify([],null,2))
        fs.readFile(pathToFile,'utf-8', function (err, data){
            products= JSON.parse(data)
        })
        return products
    }
}
products = fsData()


router.get('/', (req, res) => {
    products = fsData()
    manager.listarAll(products)
    res.send({status: 200, message: 'Hello GET All', products})
})
 
router.get('/:id', (req, res) => {
    products = fsData()
    let id =parseInt(req.params.id)
    const result = manager.listar(id, products)
    if(!result) return res.status(400).send({err:'producto no encontrado'})
    res.send({status: 200, message: 'Hello GET By Id', result})
})
 
router.post('/', (req, res) => {
    let timestamp= Date.now()
    let products = fsData()
    let prod = {...req.body , timestamp: timestamp}
    let result = manager.guardar(prod, products)
    fs.writeFileSync(pathToFile,JSON.stringify(result,null,2))
    res.send({status: 200, message: 'Hello POST', result})
})
 
router.put('/:id', (req, res) => {
    products = fsData()
    let timestamp= Date.now()
    let id = parseInt(req.params.id)
    let prod = {...req.body , timestamp: timestamp}
    let result = manager.actualizar(prod, id, products)
    fs.writeFileSync(pathToFile,JSON.stringify(result,null,2))
    res.send({status: 200, message: 'Hello PUT', result})
})
 
router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    products = fsData()
    let result = manager.borrar(id, products)
    fs.writeFileSync(pathToFile,JSON.stringify(result,null,2))
    res.send({status: 200, message: 'Hello DELETE', result})
})

module.exports = router
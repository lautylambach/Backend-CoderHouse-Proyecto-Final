const fs= require('fs')
const pathToFile = './src/data/products.json'
const express = require('express')
const router = express.Router()
const Manager = require('../controllers/ManagerProducts')
const manager =new Manager()

let products = fs.readFile(pathToFile,'utf-8', function (err, data){
    products= JSON.parse(data)
})
function fsData(){
    if(fs.existsSync(pathToFile)){
        let data=  fs.readFile(pathToFile,'utf-8', function (err, data){
            products= JSON.parse(data)
        })
        
        return{status:"succes", products}
                                     
    }else{
        fs.writeFileSync(pathToFile,JSON.stringify([],null,2))
        let data=  fs.readFile(pathToFile,'utf-8', function (err, data){
            products= JSON.parse(data)
        })
        return{status:"succes",message:'file created', products}
    }
}





router.get('/', (req, res) => {
    fsData()
    manager.listarAll(products)
    res.send({status: 200, message: 'Hello GET All', products})
})
 
router.get('/:id', (req, res) => {
    fsData()
    let id =parseInt(req.params.id)
    const result = manager.listar(id,products)
    if(!result) return res.status(400).send({err:'producto no encontrado'})
    res.send({status: 200, message: 'Hello GET By Id', result})
})
 
// router.post('/', (req, res) => {
//     res.send({status: 200, message: 'Hello POST'})
// })
 
// router.put('/:id', (req, res) => {
//     res.send({status: 200, message: 'Hello PUT'})
// })
 
// router.delete('/:id', (req, res) => {
//     res.send({status: 200, message: 'Hello DELETE'})
// })

module.exports = router
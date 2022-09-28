const fs= require('fs')
const pathToProducts = './src/data/products.json'
const pathToCarts = './src/data/carts.json'
const express = require('express')
const router = express.Router()
const ManagerProducts = require('../controllers/ManagerProducts')
const managerProducts =new ManagerProducts()
const ManagerCarts = require('../controllers/ManagerCarts')
const managerCarts =new ManagerCarts()

let carts = [] 
function fsCarts(){
    if (fs.existsSync(pathToCarts)){
        fs.readFile(pathToCarts,'utf-8', function (err, data){
            carts= JSON.parse(data)
        })
        
        return carts
    }
}
carts = fsCarts();

router.post('/', (req,res) =>{
    let result =managerCarts.crearCarrito(carts)
    
    res.send({status: 200, message:`icarrito creado con exito, id: ${result}`})
})

module.exports = router
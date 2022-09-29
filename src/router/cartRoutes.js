const fs= require('fs')
const pathToProducts = './src/data/products.json'
const pathToCarts = './src/data/carts.json'
const express = require('express')
const router = express.Router()
const ManagerProducts = require('../controllers/ManagerProducts')
const managerProducts =new ManagerProducts()
const ManagerCarts = require('../controllers/ManagerCarts')
const managerCarts =new ManagerCarts()

let admin = true
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

router.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let result = managerCarts.borrarCarrito(id)
    res.send({status: 200, message: 'Hello DELETE', result})
})
router.get('/:id/products', (req,res)=>{
    let id = parseInt(req.params.id)
    let result = managerCarts.listarProductsInCart(id)
    res.send({status:200, message:'hello get',result})
})
router.post('/:id/products',(req,res)=>{
    let id = parseInt(req.params.id)
    let product = req.body
    let result = managerCarts.agregarProductsToCart(id,product)
    res.send({status:200, message:'hello post',result})

})
router.delete('/:id/products/:id_prod',(req,res)=>{
    let id = parseInt(req.params.id)
    let product = parseInt(req.params.id_prod)
    let result = managerCarts.deleteProductsInCart(id, product)
    res.send({status:200, message:'hello post',result})

})


module.exports = router
const pathToCarts = './src/data/carts.json'
const fs= require('fs')
let carts = []
class ManagerCarts {
    constructor(route) {
        this.id = 0
        this.route =route
    }
    
    // validationId(id, products){
    //     if(id<0 || id> products.length-1){
    //         return{status: 'error' ,message:'id is not valid'}
    //     }
    // }
     
    // listar(id,products) {
    //     this.validationId(id,products)
    //     const prod = products.find(prod => prod.id == id)
    //     if(!prod) return { error: 'producto no encontr1ado' } 
    //     return prod 
    // }

    // listarAll(products) {  
    //     return [...products] || {error: 'productos no encontrados'}
    // }

    // guardar(prod, products) {
        
    //     let newId = products.length;
    //     const newProd = { ...prod, id: newId }
    //     this.validationProduct(newProd)
    //     products= Array.from(products)
    //     products.push(newProd)
    //     console.log(products)
    //     return products
    // }

    // actualizar(prod, id, products) {
    //     this.validationId(id, products)
    //     const newProd = { id: Number(id), ...prod }
    //     this.validationProduct(newProd)
    //     const index = products.findIndex(p => p.id == id)
    //     if (index !== -1) {
    //         products[index] = newProd
    //         return products
    //     } else {
    //         return { error: 'producto no encontrado' }
    //     }
    // }

    // borrar(id, products) {
    //     this.validationId(id, products)
    //     let newProducts = products.filter((prod) => prod.id !== id)
    //     return newProducts
    // }
    accederACarts(){
        if (fs.existsSync(pathToCarts)){
            fs.readFile(pathToCarts,'utf-8', function (err, data){
                carts= JSON.parse(data)
            })
            
            return carts
        }
    }
    crearCarrito(){
        let array = this.accederACarts()
        let newId = array.length+1
        let timeStamp = Date.now()
        let cart =  {id: newId,
             timestamp: timeStamp,
             products: []
            }
        array.push(cart)
        fs.writeFileSync(pathToCarts,JSON.stringify(array,null,2))

        return newId
    }
}

module.exports = ManagerCarts


class ManagerProducts {
    constructor(route) {
        this.id = 0
        this.route =route
    }
     validationProduct(product){
        if (!product.title || !product.price || !product.thumbnail) {return{status: 'error', message:'data required'}}
    }
    validationId(id, products){
        if(id<0 || id> products.length-1){
            return{status: 'error' ,message:'id is not valid'}
        }
    }
     
    listar(id,products) {
        this.validationId(id,products)
        const prod = products.find(prod => prod.id == id)
        if(!prod) return { error: 'producto no encontr1ado' } 
        return prod 
    }

    listarAll(products) {  
        return [...products] || {error: 'productos no encontrados'}
    }

    guardar(prod) {
        const newProd = { ...prod, id: ++this.id }
        this.validationProduct(newProd)
        this.productos.push(newProd)
        return newProd
    }

    actualizar(prod, id) {
        validationId(id, this.products)
        const newProd = { id: Number(id), ...prod }
        this.validationProduct(newProd)
        const index = this.productos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    borrar(id) {
        validationId(id, this.products)
        const index = this.productos.findIndex(prod => prod.id == id)
        if (index !== -1) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }
}

module.exports = ManagerProducts
import { existsSync, writeFileSync, promises, readFileSync } from 'fs';

export  class ProductManager {

    #productID = 0;
    #getID() {
        this.#productID++;
        return this.#productID
    }

    constructor() {
        this.path = ('./info.json');
        this.product = [];
        
        if (!(existsSync(this.path))) {
            writeFileSync(
                this.path,
                JSON.stringify([]))
            return;
        }
        
    }

    getProducts(){
        return this.product;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            let product = {
                title,
                description,
                id: this.#getID(),
                price,
                thumbnail,                
                code,
                stock,
            };

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Error: no se completaron los campos, faltan datos.");
                return;
            }

            let productList = JSON.parse(await promises.readFile(this.path, "utf-8"));

                productList.push(product);
                await promises.writeFile(this.path,
                    JSON.stringify(productList)
                );
                
            

        } catch (err) {
            console.log('Error al querer agregar el producto a la lista');
        }
    }

    codeFunc () {
        let readCode = JSON.parse(readFileSync(this.path, 'utf-8'));
        console.log("ReadCode:");
        console.log(readCode);
    }

    updateProduct(id, product) {

        this.product.forEach(element => {
            if (element.id == id){
                element.title = product.title;
                element.description = product.description;
                element.price = product.price;
                element.thumbnail = product.thumbnail;
                element.code = product.code;
                element.stock = product.stock;
                
                return;
            }
        })
        console.log("No existe la id: " + id)
    }
    
}

let listaProducto = new ProductManager();

async function test (){

    await listaProducto.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25);
    
    console.log("ADD listo")
    
    listaProducto.codeFunc()
    
    console.log("GET listo")
    
    }

test()

exports 
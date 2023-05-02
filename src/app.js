import  Express from "express";
import ProductManager from "./productManager";

const app = Express();
const producManager = new ProductManager;

app.use(Express.json())

app.use(Express.urlencoded({extended: true}))

app.get("/api/logs", async (req, res) => {
    try{
        producManager.codeFunc();
        res.send()
    }catch{

    }
    
})

app.listen(8080, () => {
    console.log("Escuchando puerto 8080")
})
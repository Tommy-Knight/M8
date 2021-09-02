import express from "express"
import productsRouter from "./products/index.js"

const app = express()

app.use(express.json())

app.get("/test", (req, res) => {
    res.status(200).send({ message: "Test success!" })
})

app.use("/products", productsRouter)

export default app
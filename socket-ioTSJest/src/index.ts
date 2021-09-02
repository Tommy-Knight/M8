import server from "./server"
import mongoose from "mongoose"

process.env.TS_NODE_DEV && require("dotenv").config()

//server.listen, app.listen will instantiate a new httpServer, unfortunately, without io
const port = process.env.PORT || 3030

mongoose.connect(process.env.ATLAS_URL!).then(() => {
    server.listen(port, () => {
        console.log("Server listening on port " + port)
    })
})
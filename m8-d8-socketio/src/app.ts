import express from "express"
import cors from "cors"
import { shared } from "./shared"
import roomsRouter from "./services/rooms"

// Initializing the express server
const app = express()
app.use(cors())
app.use(express.json())

app.get('/online-users', (req, res) => {
    res.send({ onlineUsers: shared.onlineUsers })
})

app.use("/rooms", roomsRouter)

export default app
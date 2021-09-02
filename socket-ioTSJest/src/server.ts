import { createServer } from "http"
import { Server } from "socket.io"
import app from "./app"
import { RoomsModel } from "./services/rooms/model"
import { shared } from "./shared"
import { SocketLogin, SocketSendMessage } from "./typings"

// Passing it to a Http Server
const server = createServer(app)

//Instantiating the io server using the http server. We can't pass the app here
const io = new Server(server, { allowEIO3: true })

// adding "event listeners"
io.on("connection", socket => {
    console.log(socket.id)

    //Emits to this client.
    //socket.emit("newLogin")

    //Emit to everyone, including this client
    // io.sockets.emit("alive", "the server is alive")

    socket.on("login", ({ username, room }: SocketLogin) => {
        shared.onlineUsers.push({ username, id: socket.id, room })

        socket.join(room)
        console.log(socket.rooms)

        // Emits to everyone excluding this client
        socket.broadcast.emit("newLogin")
        socket.emit("loggedin")
    })

    socket.on("sendmessage", async ({ message, room }: SocketSendMessage) => {

        // we want to save the message in the correct room

        await RoomsModel.findOneAndUpdate({ name: room }, {
            $push: { chatHistory: message }
        })

        socket.to(room).emit("message", message)
    })

    socket.on("disconnect", () => {
        //console.log("socket disconnected")
        shared.onlineUsers = shared.onlineUsers.filter(user => user.id !== socket.id)
    })

})

export default server
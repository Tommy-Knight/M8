import app from '../app'
import supertest from "supertest"
import mongoose from "mongoose"

import dotenv from "dotenv"
import { Message as IMessage, Message } from '../typings'
import { isMessage } from '../utils/checkers/isMesssage'

import server from "../server"
import { io as Client, Socket as ClientSocket } from 'socket.io-client'
import { RoomsModel } from '../services/rooms/model'


dotenv.config()

const request = supertest(app)

// class Message implements IMessage {
//     constructor(
//         public text: string,
//         public sender: string,
//         public timestamp: number,
//         public id: string
//     ) { }
// }



describe("Testing tests", () => {
    it("should test that true is true", () => {
        expect(true).toBe(true)
    })
})

describe("Testing rooms service", () => {

    // Initializing Alice's and Bob's sockets
    let sender: ClientSocket, receiver: ClientSocket;

    beforeAll(done => {
        const port = process.env.PORT!

        mongoose.connect(process.env.ATLAS_URL_TEST!)
            .then(() => {
                console.log("Connected to Atlas")

                // We are actually starting the server this time to test our implementation
                server.listen(port, () => {

                    // When the server is starting we are instantiating the socket clients

                    sender = Client(`http://localhost:${port}`, { transports: ['websocket'] });
                    receiver = Client(`http://localhost:${port}`, { transports: ['websocket'] });

                    // Logging in as alice and bob respectively as soon as they establish connection

                    sender.on("connect", () => {
                        sender.emit("login", { username: "alice", room: "blue" })
                    });
                    receiver.on("connect", () => {
                        receiver.emit("login", { username: "bob", room: "blue" })
                    });

                    // We just take for granted that if Alice's connection is up, Bob is also in
                    // (i could use Promise.all with an array of Promises but that sounds like an overkill).
                    sender.on("loggedin", () => {
                        done()
                    })
                });
            })
    })

    it("should test that the /rooms endpoint is returning the list of rooms.", async () => {
        const response = await request.get("/rooms")
        expect(response.status).toBe(200)
        expect(response.body.rooms.length).toBeDefined()
        expect(response.body.rooms instanceof Array).toBe(true)
    })

    const validMessage: IMessage = {
        text: "valid message",
        sender: "alice",
        timestamp: Date.now(),
        id: "randomsocketid"
    }

    // it("should test that a valid message is a valid message.", () => {
    //     console.log(validMessage)

    //     const message = new Message(validMessage.text, validMessage.sender, validMessage.timestamp, validMessage.id)

    //     expect(message instanceof Message).toBe(true)
    // })

    it("should test that a valid message is a valid message.", () => {
        expect(isMessage(validMessage)).toBe(true)
    })

    async function createRoom(name: string) {
        const newRoom = new RoomsModel({ name })
        await newRoom.save()
    }

    // you may implement testing for the room creation route here, using createRoom(req.body.name)
    // POST /rooms


    it("should test that sending a valid message to a valid room it gets saved to the DB", done => {

        createRoom("blue").then(() => {
            receiver.on("message", async () => {
                const room = (await RoomsModel.findOne({ name: "blue" }))! // we use non-null assertion here taking for granted we just created the "blue" room
                const latestMessage = room.chatHistory[room.chatHistory.length - 1]

                expect(latestMessage.text).toBe(validMessage.text)
                done()
            })

            sender.emit("sendmessage", { message: validMessage, room: "blue" })

        })
    })


    // After all the tests of this suite are executed, let's make sure to teardown properly what we've got
    afterAll(done => {
        // Drop dummy db
        mongoose.connection.dropDatabase()
            .then(() => {
                mongoose.connection.close(() => {
                    sender.close()
                    receiver.close()
                    server.close()
                    done()
                })
            })
    })


})
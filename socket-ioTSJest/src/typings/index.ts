export type Room = "blue" | "red"

export interface User {
    username: string
    id: string
    room: Room
}

export interface Message {
    text: string
    sender: string
    timestamp: number
    id: string
}

export type SocketLogin = { username: string, room: Room }
export type SocketSendMessage = { message: Message, room: Room }

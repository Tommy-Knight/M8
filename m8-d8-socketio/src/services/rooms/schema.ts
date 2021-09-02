import mongoose from "mongoose"
import { Message } from "../../typings"

export const MessageSchema = new mongoose.Schema<Message>({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

export interface IRoom {
    name: string
    chatHistory: Message[]
}

export const RoomSchema = new mongoose.Schema<IRoom>({
    name: {
        type: String,
        required: true
    },
    chatHistory: {
        type: [MessageSchema],
        required: true,
        default: []
    }
}, { timestamps: true })

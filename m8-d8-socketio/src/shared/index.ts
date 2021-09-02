import { User } from "../typings";

interface Shared {
    onlineUsers: User[]
}

export const shared: Shared = {
    onlineUsers: []
}

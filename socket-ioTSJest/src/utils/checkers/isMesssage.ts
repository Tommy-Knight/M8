import { Message } from "../../typings";

export const isMessage = (message: object): message is Message => {
    return message.hasOwnProperty('timestamp')
        && message.hasOwnProperty('text')
        && message.hasOwnProperty('sender')
}
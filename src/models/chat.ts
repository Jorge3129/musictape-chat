import {Message} from "./message";

export interface Chat {
    id: number,
    name?: string,
    user1: number,
    user2: number
    lastMessage: Message
}



export type NewChat = Omit<Chat, "id" | "lastMessage">

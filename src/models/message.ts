export interface Message {
    id: number
    content: string
    timestamp: string
    status: MessageStatus
    edited: boolean
    authorId: number
    recipientId: number
    chatId: number
}

export type NoId<T> = Omit<T, "id">
export type PartialMessage = Omit<Message, "id" | "status" | "edited">

// export const fields = [id, content, timestamp, status, userId, chatId]

export enum MessageStatus {
    SENDING,
    DELIVERED,
    SEEN
}

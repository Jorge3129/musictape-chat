import {Message, MessageStatus, NoId} from "../../models/message";
import {formatDateTime} from "../format/date";

type DBMessage = Omit<Message, "edited"> & {
    edited: number,
}

export const createMockMessage = (chatId?: number): NoId<Message> => {
    const self = Math.floor(Math.random() * 10) % 2 === 0
    return {
        content: "Hello World",
        timestamp: formatDateTime(),
        status: MessageStatus.SENDING,
        edited: false,
        authorId: self ? 1 : 2,
        recipientId: self ? 2 : 1,
        chatId: chatId || 1
    }
}

export const createMockMessageArray = (chats?: number, messages?: number) => {
    const numOfChats = chats || 3;
    const numOfMessages = messages || 3;
    return new Array(numOfChats)
        .fill(0)
        .map((_, i) => i + 1)
        // .flatMap(i => new Array(numOfMessages).fill(0).map(_ => i))
        .map(i => createMockMessage(i))
}

export const formatMessage = (message: DBMessage): Message => {
    return {
        ...message,
        edited: !!message.edited,
        timestamp: formatDateTime(message.timestamp)
    }
}

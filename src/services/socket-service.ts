import {Socket} from "socket.io";
import {FromClientEvents, FromServerEvents} from "../constants/socket-events";
import {Message, MessageStatus, NoId} from "../models/message";
import messageService from "./message-service";
import {waitFor} from "../utils/async/wait";

export const userToSocketMap = new Map<number, string>()

export const onConnect = (socket: Socket) => {

    let socketUserId: number;

    socket.on(FromClientEvents.USER_CONNECT, (userId: number) => {
        console.log(`CONNECTED USER ${userId}`)
        userToSocketMap.set(userId, socket.id);
        socketUserId = userId
    })

    socket.on(FromClientEvents.NEW_MESSAGE, async (message: NoId<Message>) => {
        // console.log('NEW_MESSAGE')
        const insertId = await messageService.addNewMessage(message)
        const socketId = userToSocketMap.get(message.recipientId)
        const newMessage = {...message, id: insertId};
        if (!socketId) return;
        console.log(`NEW_MESSAGE from ${message.authorId} to ${message.recipientId}: ${message.content}`)
        await waitFor(500)
        socket.to(socketId).emit(FromServerEvents.NEW_MESSAGE, newMessage)
    })

    socket.on(FromClientEvents.DELIVERED_MESSAGE, async (message: Message) => {
        const insertId = await messageService.setStatus(message.id, MessageStatus.DELIVERED)
        const socketId = userToSocketMap.get(message.authorId)
        if (!socketId) return;
        console.log(`DELIVERED MESSAGE from ${message.authorId} to ${message.recipientId}: ${message.content}`)
        socket.to(socketId).emit(FromServerEvents.DELIVERED_MESSAGE, message)
    })

    socket.on(FromClientEvents.SEEN_MESSAGE, async (message: Message) => {
        const insertId = await messageService.setStatus(message.id, MessageStatus.SEEN)
        const socketId = userToSocketMap.get(message.authorId)
        if (!socketId) return;
        console.log(`SEEN MESSAGE from ${message.authorId} to ${message.recipientId}: ${message.content}`)
        socket.to(socketId).emit(FromServerEvents.DELIVERED_MESSAGE, message)
    })

    socket.on(FromClientEvents.EDITED_MESSAGE, async (message: Message) => {
        const insertId = await messageService.editMessage(message.id, message.content)
        const socketId = userToSocketMap.get(message.authorId)
        if (!socketId) return;
        console.log(`EDITED MESSAGE from ${message.authorId} to ${message.recipientId}: ${message.content}`)
        socket.to(socketId).emit(FromServerEvents.EDITED_MESSAGE, message)
    })

    socket.on(FromClientEvents.DELETED_MESSAGE, async (message: Message) => {
        const insertId = await messageService.deleteMessage(message.id)
        const socketId = userToSocketMap.get(message.authorId)
        if (!socketId) return;
        console.log(`DELETED MESSAGE from ${message.authorId} to ${message.recipientId}: ${message.content}`)
        socket.to(socketId).emit(FromServerEvents.EDITED_MESSAGE, message)
    })


    socket.on('disconnect', () => {
        userToSocketMap.delete(socketUserId);
    })
}

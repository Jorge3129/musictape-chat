import {Message, NoId} from "../../models/message";
import messageService from "../message-service";
import {waitFor} from "../../utils/async/wait";
import {FromServerEvents} from "../../constants/socket-events";
import {Socket} from "socket.io";
import {userToSocketMap} from "./socket-service";


export const onNewMessage = (socket: Socket) => async (message: NoId<Message>) => {
    // console.log('NEW_MESSAGE')
    const insertId = await messageService.addNewMessage(message)
    const socketId = userToSocketMap.get(message.recipientId)
    const newMessage = {...message, id: insertId};
    if (!socketId) return;
    console.log(`NEW_MESSAGE from ${message.authorId} to ${message.recipientId}: ${message.content}`)
    await waitFor(500)
    socket.to(socketId).emit(FromServerEvents.NEW_MESSAGE, newMessage)
}

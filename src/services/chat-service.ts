import chatRepo from "../repos/chat-repo";
import {Chat} from "../models/chat";
import {NoId} from "../models/message";

export class ChatService {

    async getAllChats(userId: number): Promise<Chat[]> {
        return await chatRepo.getAllChatsForUser(userId);
    }

    async createChat(chat: NoId<Chat>): Promise<any> {
        const res = await chatRepo.addChat(chat)
        return res.insertId;
    }

    async deleteChat(id: number): Promise<any> {
        return await chatRepo.deleteChat(id)
    }

}


export default new ChatService()

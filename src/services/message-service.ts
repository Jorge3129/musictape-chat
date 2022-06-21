import {Message, MessageStatus} from "../models/message";
import {NoId} from "../models/message";
import messageRepo from "../repos/message-repo";


export class MessageService {

    async addNewMessage(message: NoId<Message>): Promise<number> {
        const result = await messageRepo.addMessage(message);
        console.log(result)
        return result.insertId;
    }

    async getMessagesForChat(chatId: number): Promise<Message[]> {
        return await messageRepo.getMessagesForChat(chatId)
    }

    async setStatus(id: number, status: MessageStatus): Promise<any> {
        return await messageRepo.setStatus(id, status)
    }

    async editMessage(id: number, content: string): Promise<any> {
        return await messageRepo.editMessage(id, content)
    }

    async deleteMessage(id: number): Promise<any> {
        return await messageRepo.deleteMessage(id)
    }
}

export default new MessageService()

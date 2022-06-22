import {NextFunction, Request, Response} from "express";
import {OK} from "http-status-codes";
import messageService from "../services/message-service";

export class MessageController {
    async getMessagesForChat(req: Request, res: Response, next: NextFunction) {
        try {
            const {chatId} = req.params;
            const parsedChatId = parseInt(chatId)
            if (isNaN(parsedChatId)) throw new Error('No userId')
            const chats = await messageService.getMessagesForChat(parsedChatId);
            res.status(OK).json(chats);
        } catch (e) {
            next(e)
        }
    }
}

export default new MessageController()

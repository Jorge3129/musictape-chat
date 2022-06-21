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

    async editMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const {message} = req.body;
            const res = await messageService.editMessage(message.id, message.content);
            res.status(OK).json(res);
        } catch (e) {
            next(e)
        }
    }

    async deleteMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const {messageId} = req.params;
            const parsedId = parseInt(messageId)
            if (isNaN(parsedId)) throw new Error('No message id')
            const res = await messageService.deleteMessage(parsedId);
            res.status(OK).json(res);
        } catch (e) {
            next(e)
        }
    }

}

export default new MessageController()

import {NextFunction, Request, Response} from "express"
import chatService from "../services/chat-service";
import {OK} from "http-status-codes";

export class ChatController {
    async getAllChats(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = res.locals;
            if (!userId) throw new Error('No userId')
            const chats = await chatService.getAllChats(userId);
            res.status(OK).json(chats);
        } catch (e) {
            next(e)
        }
    }

    async createChat(req: Request, res: Response, next: NextFunction) {
        try {
            const chat = req.body;
            const insertId = await chatService.createChat(chat)
            res.status(OK).json({...chat, id: insertId});
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async deleteChat(req: Request, res: Response, next: NextFunction) {
        try {
            const {chatId} = req.params;
            const parsedChatId = parseInt(chatId);
            if (isNaN(parsedChatId)) throw new Error('No chat id')
            const result = await chatService.deleteChat(parsedChatId);
            res.status(OK).json(result);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

export default new ChatController()

import {NextFunction, Request, Response} from "express"
import chatService from "../services/chat-service";
import {OK} from "http-status-codes";

export class ChatController {
    async getAllChats(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;
            const parsedUserId = parseInt(userId)
            if (isNaN(parsedUserId)) throw new Error('No userId')
            const chats = await chatService.getAllChats(parsedUserId);
            res.status(OK).json(chats);
        } catch (e) {
            next(e)
        }
    }

    async getChatById(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;
            const parsedUserId = parseInt(userId)
            if (isNaN(parsedUserId)) throw new Error('No userId')
            const chats = await chatService.getAllChats(parsedUserId);
            res.status(OK).json(chats);
        } catch (e) {
            next(e)
        }
    }
}

export default new ChatController()

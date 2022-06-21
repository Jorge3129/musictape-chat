import {Router} from 'express';
import messageController from "../controllers/message-controller";

const router = Router();
router.get('/:chatId', messageController.getMessagesForChat)

export default router

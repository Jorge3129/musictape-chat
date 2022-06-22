import {Router} from 'express';
import chatController from "../controllers/chat-controller";
import messageController from "../controllers/message-controller";

const router = Router();

router.get('/', chatController.getAllChats)
router.post('/', chatController.createChat)
router.delete('/:chatId', chatController.deleteChat)
router.get('/:chatId/messages', messageController.getMessagesForChat)

export default router

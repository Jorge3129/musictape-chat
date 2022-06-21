import {Router} from 'express';
import chatController from "../controllers/chat-controller";


const router = Router();

router.get('/:userId', chatController.getAllChats)
router.get('/:userId/:chatId', chatController.getChatById)

export default router

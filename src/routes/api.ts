import { Router } from 'express';
import { authMw } from './middleware';
import chatRouter from "./chat-router";
import messageRouter from "./message-router";

const apiRouter = Router();
apiRouter.use('/chats', chatRouter)
apiRouter.use('/messages', messageRouter)

export default apiRouter;

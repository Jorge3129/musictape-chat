import {Router} from 'express';
import chatRouter from "./chat-router";
import {authMiddleware} from "./auth-middleware";

const apiRouter = Router();
apiRouter.use('/chats', authMiddleware, chatRouter)

export default apiRouter;

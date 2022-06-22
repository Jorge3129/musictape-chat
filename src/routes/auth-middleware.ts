import StatusCodes from 'http-status-codes';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken'
import publicKeyService from "../services/public-key-service";

const {UNAUTHORIZED} = StatusCodes;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        const publicKey = publicKeyService.getKey();
        if (!token) throw new Error('No token present')
        const decodedToken: any = jwt.verify(token, publicKey);
        const userId = decodedToken?.id;
        if (!decodedToken || typeof userId !== "number") throw Error('Invalid token');
        res.locals.userId = userId;
        next();
    } catch (err: any) {
        return res.status(UNAUTHORIZED).json({
            error: err.message,
        });
    }
}

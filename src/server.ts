import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import http from 'http';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import {Server as SocketIo} from 'socket.io';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors'

// import 'express-async-errors';

import BaseRouter from './routes/api';
import { onConnect } from './services/socket/socket-service';

const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/', BaseRouter);

class CustomError extends Error {
    HttpStatus: number = 400
}

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    // logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json({
        error: err.message,
    });
});

/************************************************************************************
 *                                   Setup Socket.io
 ***********************************************************************************/

const server = http.createServer(app);
const io = new SocketIo(server, {
    cors: {
        origin: '*'
    }
});

io.sockets.on('connect', onConnect);


/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default server;

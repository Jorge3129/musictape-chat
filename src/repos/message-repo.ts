import {Message, MessageStatus, NoId} from "../models/message";
import {DBConnection} from "./db-connection";
import {formatMessage} from "../utils/entities/message-utils";

export class MessageRepo {

    constructor(private db: DBConnection) {
    }

    async addMessage(message: NoId<Message>): Promise<any> {
        const {content, timestamp, status, authorId, recipientId, chatId} = message;
        const result = await this.db.query(`
            INSERT INTO messages (content, timestamp, status, authorId, recipientId, chatId)
            VALUES (?,?,?,?,?,?);
        `, [content, timestamp, status, authorId, recipientId, chatId])
        return result;
    }

    async getMessageById(id: number): Promise<Message | null> {
        const result = await this.db.query(`SELECT * FROM messages WHERE id = ?`, id)
        if (!result[0]) return null;
        return formatMessage(result[0]);
    }

    async setStatus(id: number, status: MessageStatus): Promise<any> {
        const result = await this.db.query(`
            UPDATE messages SET status = ?
            WHERE id = ?;
        `, [status, id])
        return result;
    }

    async editMessage(id: number, content: string): Promise<any> {
        await this.db.query(`
            UPDATE messages SET content = ?, edited = ?
            WHERE id = ?;
        `, [content, true, id])
    }

    async deleteMessage(id: number): Promise<any> {
        const result = await this.db.query(`
            DELETE FROM messages WHERE id = ?;
        `, [id])
        return result;
    }

    async getMessagesForChat(chatId: number): Promise<any> {
        const result = await this.db.query(`
            SELECT * FROM messages 
            WHERE chatId = ?
            ORDER BY timestamp ASC;
        `, [chatId])
        return result;
    }

    async getLimitedMessagesForChat(chatId: number, offset: number, limit: number): Promise<any> {
        const result = await this.db.query(`
            SELECT * FROM messages 
            WHERE chatId = ?
            ORDER BY timestamp ASC
            LIMIT ? OFFSET ?;
        `, [chatId, limit, offset])
        return result;
    }
}

export default new MessageRepo(DBConnection.getInstance())

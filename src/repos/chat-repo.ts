import {DBConnection} from "./db-connection";
import {Chat, NewChat} from "../models/chat";


export class ChatRepo {
    constructor(private db: DBConnection) {
    }

    async addChat(chat: NewChat) {
        const {name, user1, user2} = chat;
        const result = await this.db.query(`
            INSERT INTO chats (name, user1, user2)
            VALUES (?,?,?);
        `, [name, user1, user2])
        return result;
    }

    async getChatById(id: number): Promise<Chat | null> {
        const result = await this.db.query(`
            SELECT * FROM chats WHERE id = ?
        `, id)
        return result[0] || null;
    }

    async getAllChatsForUser(userId: number): Promise<Chat[]> {
        const result = await this.db.query(`
            SELECT * FROM chats WHERE user1 = ? OR user2 = ?
        `, [userId, userId])
        return result;
    }

    async deleteChat(id: number) {
        const result = await this.db.query(`
            DELETE FROM chats WHERE id = ?;
        `, id)
        return result;
    }
}

export default new ChatRepo(DBConnection.getInstance())

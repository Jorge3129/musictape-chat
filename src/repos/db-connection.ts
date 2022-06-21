import {createPool, Pool} from "mysql2";
import {tableQueries} from "./queries/create-tables-queries";
import {asyncForEach} from "../utils/async/async-map";
import {NewChat} from "../models/chat";
import {mockQueries} from "../../tests/spec/repos/mock-queries";
import {createMockMessageArray} from "../utils/entities/message-utils";
import {Message, NoId} from "../models/message";

export class DBConnection {
    pool?: Pool;

    private static INSTANCE?: DBConnection;

    private constructor() {
    }

    public static getInstance(): DBConnection {
        if (!DBConnection.INSTANCE) DBConnection.INSTANCE = new DBConnection()
        return DBConnection.INSTANCE
    }


    init() {
        try {
            this.pool = createPool({
                host: 'localhost',
                user: 'root',
                password: 'sgHui780156@#78rTy!%',
                database: 'chat',
            })

            //console.debug('MySql Adapter Pool generated successfully');
        } catch (error) {
            console.error('[mysql.connector][init][Error]: ', error);
            throw new Error('failed to initialized pool');
        }
    };


    query(query: string, values?: any | any[] | { [param: string]: any }): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                if (!this.pool)
                    throw new Error('Pool was not created. Ensure pool is created when running the app.');
                this.pool.query(query, values, (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                });
            });

        } catch (error) {
            console.error('[mysql.connector][execute][Error]: ', error);
            throw new Error('failed to execute MySQL query');
        }
    }

    async createTables() {
        await this.query(tableQueries.CREATE_CHATS);
        await this.query(tableQueries.CREATE_MESSAGES);
        await this.query(tableQueries.CREATE_USERS_CHATS);
    }

    async insertSampleData() {
        const mockChats = [
            {name: 'A', user1: 1, user2: 2},
            {name: 'B', user1: 2, user2: 3},
            {name: 'C', user1: 3, user2: 4},
            {name: 'D', user1: 2, user2: 4},
        ]
        await asyncForEach<NewChat>(mockChats, async (chat) => {
            await this.query(mockQueries.INSERT_CHAT, [chat.name, chat.user1, chat.user2])
        })
        const messages = createMockMessageArray(4, 10);
        await asyncForEach(messages, async (m: NoId<Message>) => {
            const {content, timestamp, status, authorId, recipientId, chatId} = m;
            await this.query(mockQueries.INSERT_MESSAGES,
                [content, timestamp, status, authorId, recipientId, chatId]
            );
        })
    }

    async dropTables() {
        await this.query(tableQueries.DROP_MESSAGES);
        await this.query(tableQueries.DROP_CHATS);
        await this.query(tableQueries.DROP_USERS_CHATS);
    }

    end() {
        this.pool?.end();
    }
}

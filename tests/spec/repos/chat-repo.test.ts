import {DBConnection} from "../../../src/repos/db-connection";
import {ChatRepo} from "../../../src/repos/chat-repo";
import {mockQueries} from "./mock-queries";
import {asyncForEach} from "../../../src/utils/async/async-map";
import {NewChat} from "../../../src/models/chat";
import {removeIds} from "../../../src/utils/format/no-id";

describe('CurrentChat CRUD', () => {

    const db: DBConnection = DBConnection.getInstance();
    let chatRepo: ChatRepo;
    const mockChats = [
        {name: 'A', user1: 1, user2: 2},
        {name: 'B', user1: 2, user2: 3},
        {name: 'C', user1: 3, user2: 4},
        {name: 'D', user1: 2, user2: 4},
    ]

    beforeAll(async () => {
        db.init();
    });

    beforeEach(async () => {
        await db.dropTables();
        await db.createTables();
        chatRepo = new ChatRepo(db);
    });

    afterAll(async () => {
        db.end();
    });

    test("should insert at id 1", async () => {
        const result = await chatRepo.addChat(mockChats[0]);
        expect(result.insertId).toBe(1)
    });

    test("should find the inserted chat", async () => {
        const result = await chatRepo.addChat((mockChats[0]))
        const {insertId} = result;
        const findResult = await chatRepo.getChatById(insertId);
        expect(findResult).toEqual({...mockChats[0], id: insertId})
    });

    test("should find all chats for user", async () => {
        await asyncForEach<NewChat>(mockChats, async (chat) => {
            await db.query(mockQueries.INSERT_CHAT, [chat.name, chat.user1, chat.user2])
        })
        const userId = 2;
        const expectedChats = mockChats.filter(chat => chat.user1 === userId || chat.user2 === userId)
        const findResult = await chatRepo.getAllChatsForUser(userId);
        expect(removeIds(findResult)).toEqual(expectedChats);
    });
})

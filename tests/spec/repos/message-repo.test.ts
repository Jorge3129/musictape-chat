import {DBConnection} from "../../../src/repos/db-connection";
import {MessageRepo} from "../../../src/repos/message-repo";
import {mockQueries} from "./mock-queries";
import {createMockMessage, createMockMessageArray} from "../../../src/utils/entities/message-utils";
import {MessageStatus} from "../../../src/models/message";
import {asyncForEach} from "../../../src/utils/async/async-map";

describe('Message CRUD', () => {

    const db: DBConnection = DBConnection.getInstance();
    let messageRepo: MessageRepo;
    const message1 = createMockMessage()

    beforeAll(async () => {
        db.init();
    });

    beforeEach(async () => {
        await db.dropTables();
        await db.createTables();
        await asyncForEach(new Array(3).fill(0), async () => {
            await db.query(mockQueries.INSERT_CHAT, ["Глисти із жопи", 1, 1]);
        })
        messageRepo = new MessageRepo(db);
    });

    afterAll(async () => {
        db.end();
    });

    test("should insert at id 1", async () => {
        const result = await messageRepo.addMessage(message1);
        expect(result.insertId).toBe(1)
    });

    test("should find the inserted message", async () => {
        const result = await messageRepo.addMessage(message1);
        const {insertId} = result;
        const findResult = await messageRepo.getMessageById(insertId);
        expect(findResult).toEqual({...message1, id: insertId})
    });

    test("should set status to DELIVERED", async () => {
        const result = await messageRepo.addMessage(message1);
        const {insertId} = result;
        await messageRepo.setStatus(insertId, MessageStatus.DELIVERED);
        const findResult = await messageRepo.getMessageById(insertId);
        expect(findResult?.status).toEqual(MessageStatus.DELIVERED)
    });

    test("should set status to SEEN", async () => {
        const result = await messageRepo.addMessage(message1);
        const {insertId} = result;
        await messageRepo.setStatus(insertId, MessageStatus.SEEN);
        const findResult = await messageRepo.getMessageById(insertId);
        expect(findResult?.status).toEqual(MessageStatus.SEEN)
    });


    test("should edit content", async () => {
        const editedText = "Goodbye Mars";
        const result = await messageRepo.addMessage(message1);
        const {insertId} = result;
        await messageRepo.editMessage(insertId, editedText);
        const findResult = await messageRepo.getMessageById(insertId);
        expect(findResult?.content).toEqual(editedText)
        expect(findResult?.edited).toBeTruthy()
    });

    test("should delete message", async () => {
        const result = await messageRepo.addMessage(message1);
        const {insertId} = result;
        await messageRepo.deleteMessage(insertId);
        const findResult = await messageRepo.getMessageById(insertId);
        expect(findResult).toBeNull()
    });


    test("should get messages for chat", async () => {
        const messages = createMockMessageArray();
        await asyncForEach(messages, async (m) => {
            await messageRepo.addMessage(m);
        })
        const chatId = 1;
        const findResult = await messageRepo.getMessagesForChat(chatId);
        const expected = messages.filter(m => m.chatId === chatId);
        expect(findResult.length).toBe(expected.length);
    });
})

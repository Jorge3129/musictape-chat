export const mockQueries = {
    INSERT_CHAT: `
        INSERT INTO chats (name, user1, user2)
        VALUES (?,?,?)
    `,
    INSERT_MESSAGES: `
        INSERT INTO messages (content, timestamp, status, authorId, recipientId, chatId)
        VALUES (?,?,?,?,?,?);
    `
}

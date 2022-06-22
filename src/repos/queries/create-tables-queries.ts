export const tableQueries = {
    CREATE_CHATS: `
        CREATE TABLE IF NOT EXISTS chats (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            user1 INT NOT NULL,
            user2 INT NOT NULL
        );
    `,
    CREATE_MESSAGES: `
        CREATE TABLE IF NOT EXISTS messages (
            id INT PRIMARY KEY AUTO_INCREMENT,
            content TEXT NOT NULL,
            timestamp DATETIME NOT NULL,
            status INT NOT NULL DEFAULT 0,
            edited BOOLEAN NOT NULL DEFAULT FALSE,
            authorId INT NOT NULL,
            recipientId INT NOT NULL,
            chatId INT NOT NULL,
            FOREIGN KEY (chatId) REFERENCES chats(id) ON DELETE CASCADE
        );
    `,
    CREATE_USERS_CHATS: `
        CREATE TABLE IF NOT EXISTS users_chats (
            userId INT NOT NULL,
            chatId INT NOT NULL
        );
    `,
    DROP_MESSAGES: `DROP TABLE IF EXISTS messages`,
    DROP_CHATS: `DROP TABLE IF EXISTS chats`,
    DROP_USERS_CHATS: `DROP TABLE IF EXISTS users_chats`,
}

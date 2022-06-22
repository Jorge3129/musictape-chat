import server from "./server";
import {DBConnection} from "./repos/db-connection";

const SERVER_MESSAGE = 'Express server started on port: ';
const PORT = (process.env.PORT || 9457);

const init = async () => {
    const con = await DBConnection.getInstance()
    con.init();
    await con.dropTables();
    await con.createTables();
    await con.insertSampleData()

    server.listen(PORT, () => {
        console.log(SERVER_MESSAGE + PORT)
    });
}

init()


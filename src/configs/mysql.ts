import mysql from 'mysql2';
import config from './config';

const params = {
    host: config.mysql.host,
    user: config.mysql.user,
    password : config.mysql.pass,
    database: config.mysql.database,
    port: 1109
}

const Connect = async () => new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);

    connection.connect((error) => {
        if(error){
            reject(error);
            return;
        }
        resolve(connection);
    });
});

const Query = async (connection: mysql.Connection, query: string) => new Promise((resolve, reject) => {
    connection.query(query, connection, (error, result) => {
        if(error){
            reject(error);
            return;
        }
        resolve(result);
    });
});

export { Connect, Query };
import {MongoClient}  from 'mongodb'
import dotenv  from 'dotenv'

dotenv.config();

export function config_mongodb(){

    const url = process.env.MONGODB_KEY;
    const client = new MongoClient(url);

    const dbName = process.env.MONGODB_NAME;
    client.connect();

    console.log('Connected successfully to server');
    const db = client.db(dbName);
    return db.collection('chatstelegram');
}
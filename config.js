import dotenv   from 'dotenv'
import telegram from 'node-telegram-bot-api';
import OpenAI   from 'openai-api';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const token = process.env.TELEGRAM_API_KEY;

export const chatMessage = process.env.TELEGRAM_CHAT_ID;

export function config_telegram(){
    return new telegram(token, {polling: true})
}

export function config_openAI(){
    return new OpenAI(OPENAI_API_KEY)
}


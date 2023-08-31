import dotenv   from 'dotenv'
import telegram from 'node-telegram-bot-api';
import OpenAI   from 'openai'

dotenv.config();

export const chatMessage = process.env.TELEGRAM_CHAT_ID;

export function config_telegram(){
    return new telegram(process.env.TELEGRAM_API_KEY, {polling: true})
}

export function config_openAI(){
    return  new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
}


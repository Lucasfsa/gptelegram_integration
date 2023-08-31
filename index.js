import telegram from 'node-telegram-bot-api';
import OpenAI   from 'openai-api';
import dotenv from 'dotenv'

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const token = process.env.TELEGRAM_API_KEY;
const chatMessage = process.env.TELEGRAM_CHAT_ID;

const openai = new OpenAI(OPENAI_API_KEY)

let bot = new telegram(token, {polling: true})

bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if(chatId == chatMessage){

        openai.complete({
            engine: "text-davinci-003",
            prompt: messageText, 
            temperature: 1, 
            max_tokens: 4000 
        })
       .then((res) => {
            const reply = res.data.choices[0].text;
            bot.sendMessage(chatId,reply);
       })
       .catch((error) => {
            bot.sendMessage(chatId,`❌ OpenAI Response Error: ${error}`);
            console.log(error)
       });    
    }

});
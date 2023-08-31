import telegram from 'node-telegram-bot-api';
import OpenAI   from 'openai-api';
import dotenv from 'dotenv'

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY)

const token = '6610292144:AAFboDwjLsB934n-PlHHsgqkni-TUdoSk4k';
const chatMessage = 1132833383;

let bot = new telegram(token, {polling: true})

bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    console.log(chatId)
    console.log(messageText)
    if(chatId == chatMessage){

        openai.complete({
            engine: "text-davinci-003",
            prompt: messageText, 
            temperature: 1, 
            max_tokens: 4000 
        })
       .then((res) => {
            const reply = res.data.choices[0].text;
            console.log(res.data)
            bot.sendMessage(chatId,reply);
       })
       .catch((error) => {
            bot.sendMessage(chatId,`❌ OpenAI Response Error: ${error}`);
            console.log(error)
       });    
    }

});
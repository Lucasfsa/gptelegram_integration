import { config_openAI, config_telegram, chatMessage } from './config.js';

const openai = config_openAI()
const telegram_bot = config_telegram()

telegram_bot.on('message', async msg => {
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
            telegram_bot.sendMessage(chatId,reply);
       })
       .catch((error) => {
        telegram_bot.sendMessage(chatId,`❌ OpenAI Response Error: ${error}`);
            console.log(error)
       });    
    }

});
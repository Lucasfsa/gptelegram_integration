import { config_openAI, config_telegram } from './src/config.js';

const openai = config_openAI()
const telegram_bot = config_telegram()

telegram_bot.on('message', async msg => {

    const chat_id = msg.chat.id;

    const messages = [
        {
            role: 'system',
            content:"Jailsons bot is a virtual assistant, it is responsible for informing about products, prices, stock, and general information about the company Jailson Móveis. It can also provide information about the company's history, mission, values, address, and working hours."
        },
        {
            role: 'user',
            content: msg.text
        }
      ]
    
 
    openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-0613:personal:bot-training:7vH0AHp9",
        messages, 
        temperature: 0.4, 
        max_tokens: 200
    })
    .then((res) => {
        const reply = res.choices[0].message.content;
        telegram_bot.sendMessage(chat_id,reply);
    })
    .catch((error) => {
        telegram_bot.sendMessage(chat_id,`❌ OpenAI Response Error: ${error}`);
        console.log(error)
    });    
    
});
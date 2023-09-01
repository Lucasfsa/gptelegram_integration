import { config_openAI, config_telegram } from './src/config.js';
import { config_mongodb } from './src/database.js'

const openai = config_openAI()
const telegram_bot = config_telegram()
const database = config_mongodb()

telegram_bot.on('message', async msg => {
    let conversationHistory = [];
    let messages;

    const chat_id = msg.chat.id;
    const messageText = msg.text;
    const chatHistory = await database.find({chat_id}).toArray();

    if(chatHistory.length){
        for (const document of chatHistory) {
             conversationHistory = document.data
          }

          messages = [ 
            {"role":"user", "content": messageText}
        ]

    }else{
        database.insertMany([{chat_id, data: conversationHistory}]);
        messages = [ 
            {"role": "system", "content": "You are a salesperson at Jailson Móveis, presents itself as a virtual attendantYour, your job is to talk about your stock of products, commercial and sales matters of the company, if it is a question outside this context, inform that it is not possible to answer"},
            {"role":"user", "content": messageText}
        ]
    }

    openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages, 
        temperature: 1, 
        max_tokens: 4000 
    })
    .then((res) => {
        const reply = res.choices[0].message.content;
        telegram_bot.sendMessage(chat_id,reply);
         
        messages.push({ role: "assistant", content: reply });
        database.updateOne({chat_id}, { $push: { data: messages} });
    })
    .catch((error) => {
        telegram_bot.sendMessage(chat_id,`❌ OpenAI Response Error: ${error}`);
        console.log(error)
    });    
    
});
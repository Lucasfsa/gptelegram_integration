import { config_openAI, config_telegram } from './src/config.js';

const openai = config_openAI()
const telegram_bot = config_telegram()

console.log('Aplicação rodando 🟢')

telegram_bot.on('message', async msg => {

    console.log(Date() + ' ---- Nova mensagem do telegram detectada 📝🟢')

    const chat_id = msg.chat.id;

    const messages = [
        {
            role: 'system',
            content:"Maria é a assistente virtual da Casa & Decoração Móveis. Ela é responsável por informar sobre produtos, preços, estoque e informações gerais sobre a empresa. Maria também pode fornecer informações sobre a história, missão, valores, endereço, horário de funcionamento da empresa, estoque e forma de pagamento"
        },
        {
            role: 'user',
            content: msg.text
        }
      ]

    openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-0613:personal:maria-model-v1:87ObW00z",
        messages, 
        temperature: 0.2, 
        max_tokens: 200
    })
    .then((res) => {
        const reply = res.choices[0].message.content;
        telegram_bot.sendMessage(chat_id,reply);

        console.log(Date() + ' ---- Mensagem de resposta da IA enviada 📬🟢')

    })
    .catch((error) => {
        telegram_bot.sendMessage(chat_id,`❌ OpenAI Response Error: ${error}`);
        console.log(error)

        console.log(Date() +' ---- Erro na resposta da IA 📬❌')

    });    
    
});
const TeleBot = require('telebot');
const fetch = require("node-fetch");
const Message = require("./message");
const cron = require('node-cron');

const bot = new TeleBot("1081272844:AAG8NC5t1jtStJ7V7T6s_mp1Twd2Wo6FqUo");
const base_url = 'https://corona.lmao.ninja/v2/countries/';

let latest_number_of_cases = 0;
let chats_to_update=[];

//Cron stuff
// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function() {
  getData(base_url+'Portugal')
  .then(country_data => {
    if (country_data.cases > latest_number_of_cases) {
      latest_number_of_cases = country_data.cases;
      let custom_message = new Message(country_data);
      chats_to_update.forEach(chat => {
        bot.sendMessage(chat,custom_message.getMessage())
      });
      console.info(`Data Updated. Latest cases: ${latest_number_of_cases}`);
    }
  })
  .catch(err => {
    console.error(err);
  })
  console.log(`Chats to update: ${chats_to_update}`);
});

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

bot.on('/subscribe', (msg) => {
  let chat_id = msg.chat.id;
  if(!chats_to_update.includes(chat_id))
  {
    chats_to_update.push(msg.chat.id);
    msg.reply.text('Chat Subscribed.')
  }else{
    chats_to_update.filter(chat => {
      chat != msg.chat.id;
    })
    msg.reply.text('Chat Unsubscribed.')
  }
})

bot.on('/covid', (msg) => {
  let country = msg.text.split(' ')[1];

  if(country == undefined)
  {
      country = 'Portugal';
  }

  getData(base_url+country)
  .then(country_data => {
      let custom_message = new Message(country_data);
      msg.reply.text(custom_message.getMessage())
  })
  .catch(err => {
      console.error(err);
      msg.reply.text(err);
  })
});

bot.start();



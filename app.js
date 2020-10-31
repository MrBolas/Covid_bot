const TeleBot = require('telebot');
const fetch = require("node-fetch");
const Message = require("./message");
const cron = require('node-cron');
const chatUpdateManager = require('./chatsUpdateManager');
const DJ = require('./musicManager');
require('dotenv').config();

const bot = new TeleBot(`${process.env.BOT_KEY}`);
const base_url = 'https://corona.lmao.ninja/v2/countries/';

let chatManager = new chatUpdateManager;

cron.schedule('* * * * *', function() {
  const subscriptionList = chatManager.getList();
  for (const list_entry of subscriptionList) {
    getData(base_url+list_entry.country)
    .then(country_data => {
      if (country_data.cases > list_entry.number_of_cases) {
        list_entry.number_of_cases = country_data.cases;
        let custom_message = new Message(country_data);
        let song = DJ.getRandomSong();
        bot.sendMessage(list_entry.chatId,custom_message.getMessage())
        bot.sendVoice(chat_id,song.filepath,song.metadata);
        console.info(`Data Updated. Latest cases for ${list_entry.country}: ${list_entry.number_of_cases}`);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
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
  let country = msg.text.split(' ')[1];
  if(country == undefined)
  {
      country = 'Portugal';
  }

  if(!chatManager.isSubscriptionInList(chat_id,country)){
    getData(base_url+country)
    .then(country_data => {
      if (country_data.country != undefined) {
        let number_of_cases = country_data.cases;
        let request_author = `${msg.from.first_name} ${msg.from.last_name}`;
        chatManager.addNewChat(chat_id, country, number_of_cases, request_author);
        console.info(`${chat_id} Subscribed`)
        msg.reply.text(`${country} Subscribed`);
      }else{
        msg.reply.text(`${country} not in API`);
      }
    })
    .catch(err => {
      msg.reply.text(err);
    })
  }else{
    chatManager.removeChat(chat_id, country);
    console.info(`${chat_id} Unsubscribed`)
    msg.reply.text(`${country} Unsubscribed`);
  }
})

bot.on('/covid', (msg) => {
  let chat_id = msg.chat.id;
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

bot.on('/subscriptions', (msg) => {
  let chat_id = msg.chat.id;
  let subscriptions = chatManager.getSubscriptions(chat_id)

  let message='Current Subscriptions:\n';
  for (const subscription of subscriptions) {
      message = message + `${subscription.country}\n`
  }
  msg.reply.text(message);
})

//unofficial commands

bot.on('/DJ', (msg) => {
  let chat_id = msg.chat.id;
  let song = DJ.getRandomSong();
  bot.sendVoice(chat_id,song.filepath,song.metadata);
})

bot.on('/log', (msg) => {
  console.log(chatManager.getList())
})

bot.start();



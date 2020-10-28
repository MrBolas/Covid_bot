const TeleBot = require('telebot');
const fetch = require("node-fetch");
const Message = require("./message");
const cron = require('node-cron');
const chatUpdateManager = require('./chatsUpdateManager');
require('dotenv').config();

const bot = new TeleBot(`${process.env.BOT_KEY}`);
const base_url = 'https://corona.lmao.ninja/v2/countries/';

let chatManager = new chatUpdateManager;

cron.schedule('* * * * *', function() {
  const subscriptionList = chatManager.getList();
  for (const list_entry of subscriptionList) {
    console.log(chatManager.getList())
    getData(base_url+list_entry.country)
    .then(country_data => {
      if (country_data.cases > list_entry.number_of_cases) {
        list_entry.number_of_cases = country_data.cases;
        let custom_message = new Message(country_data);
        bot.sendMessage(list_entry.chatId,custom_message.getMessage())
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
      let number_of_cases = country_data.cases;
      chatManager.addNewChat(chat_id, country, number_of_cases);
      console.info(`${chat_id} Subscribed`)
      msg.reply.text(`${country} Subscribed`);
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

bot.on('/log', (msg) => {
  console.log(chatManager.getList())
})

bot.start();



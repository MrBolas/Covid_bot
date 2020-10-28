class chatUpdateManager {

    update_list = [];

    constructor(){

    }

    isSubscriptionInList(chat_id, country){
        let chatQuery = {
            chatId: chat_id,
            country: country,
        }

        if(this.update_list.filter((list_entry) => {
            return list_entry.country == chatQuery.country 
            && list_entry.chatId == chatQuery.chatId
        }).length>0){
            return true;
        }else{
            return false;
        }
    }

    addNewChat(chat_id, country, number_of_cases){
        let newChatRequest = {
            chatId: chat_id,
            country: country,
            number_of_cases: number_of_cases
        }
        this.update_list.push(newChatRequest)
    }

    removeChat(chat_id, country){
        let deleteChatRequest = {
            chatId: chat_id,
            country: country
        }
        
        this.update_list = this.update_list.filter((updateChatEntry) => {
            return updateChatEntry.country != deleteChatRequest.country 
            || updateChatEntry.chatId != deleteChatRequest.chatId ;
        })
    }

    getList(){
        return this.update_list;
    }

}

module.exports = chatUpdateManager;
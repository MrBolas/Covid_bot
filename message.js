class Message{
    message;

    constructor(country_data)
    {
        this.message = `Covid for ${country_data.country}:\nNew cases: ${country_data.todayCases}\nNew deaths: ${country_data.todayDeaths}\nActive: ${country_data.active}`
    }

    getMessage()
    {
        return this.message;
    }

}

module.exports = Message;
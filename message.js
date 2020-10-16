class Message{
    message;

    constructor(country_data)
    {
        this.message = `Covid for ${country_data.country}:\nNew cases: ${country_data.todayCases}\nCases: ${country_data.cases}\nNew deaths: ${country_data.todayDeaths}\nDeaths: ${country_data.deaths}\nActive: ${country_data.active}\nRecovered: ${country_data.recovered}\nTests: ${country_data.tests}\nTestsPerMillion: ${country_data.testsPerOneMillion}`
    }

    getMessage()
    {
        return this.message;
    }

}

module.exports = Message;
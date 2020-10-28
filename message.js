const emoji = require('node-emoji');

class Message{
    message;

    constructor(country_data)
    {
        this.message = 
`Covid for ${country_data.country} ${emoji.get(`flag-${country_data.countryInfo.iso2.toLowerCase()}`)}:
New cases ${emoji.get('mask')}: ${country_data.todayCases}
Cases ${emoji.get('mask')}: ${country_data.cases}
New deaths ${emoji.get('skull')}: ${country_data.todayDeaths}
Deaths ${emoji.get('skull')}: ${country_data.deaths}
Active ${emoji.get('zombie')}: ${country_data.active}
Recovered ${emoji.get('runner')}: ${country_data.recovered}
Tests${emoji.get('syringe')}: ${country_data.tests}
TestsPerMillion${emoji.get('syringe')}: ${country_data.testsPerOneMillion}`
    }

    getMessage()
    {
        return this.message;
    }

}

module.exports = Message;
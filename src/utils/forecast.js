const request = require('request')
const geocode = require('./geocode')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/83e800f96bfe69336db20bb5db30e452/' + longitude +',' + latitude + '?units=si&lang=uk'
    
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature +
                " degrees out. There is a " + body.currently.precipProbability +
                "% chance of rain. Today high is " + body.daily.data[0].temperatureHigh + " degrees,  today low is " + 
                body.daily.data[0].temperatureLow + " degrees.")
        }
    })
}

module.exports = forecast
const request = require('request');

const getWeatherInfo = (lat, long, callback) => {
    let url = 'https://api.darksky.net/forecast/97c3cae4fa33c05abeb0dfc2e91543a0/' + lat + ',' + long + ' ';
    request({
        // url: url,
        url, // short hand syntax
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to network', undefined);
        } else if (body.error) {
            callback('Unable to Fetch the location', undefined);
        } else {
            const temp = body.currently.temperature;
            const rainProbability = body.currently.precipProbability;
            const summery = body.daily.data[0].summary;
            callback(undefined, summery + ' It is currently ' + temp + ' degrees out. There is a ' + rainProbability + '% chance of rain.');
        }
    })
}

module.exports = getWeatherInfo;
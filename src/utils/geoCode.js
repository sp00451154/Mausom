const request = require('request');


const geoCode = (address, callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGFuZGFzaWJhNzg2IiwiYSI6ImNrMzVidmV4MDBoY3czaHBlZnFjZWNkMWYifQ.eGSHTw0nj1O2hyjfFAmyoA';
    request({
        url: url,
        json: true
        // }, (error, response) => {
    }, (error, {
        body
    }) => { // destructured
        if (error) {
            callback('Network Error', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find the coordinate for the given Location', undefined);
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geoCode;
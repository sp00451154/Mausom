const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geoCode = require('../src/utils/geoCode');
const weatherInfo = require('../src/utils/getWeatherInfo');

// Define Paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Siba Panda"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Siba Panda",
        helpText: 'This section is to Help Others'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Siba Panda"
    });
})

app.get('/weather', (req, res) => {
    if (req.query.address.trim().length ==0) {
        return res.send(
            'Address must be provided'
        )
    }
    geoCode(req.query.address, (error, {lat,long,location}={}) => {
        if (error) {
            return res.send({
                // error: "Error in getting geoCode"
                error
            })
        }
        weatherInfo(lat, long, ((error, result) => {
            if (error) {
                return res.send({
                    // error: "Error in getting weather Info"
                    error
                })
            }
            res.send({
                forecast: result,
                location: location,
                address: req.query.address
            })
        }))
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a value for search'
        })
    }
    console.log(req.query.search)
    res.send([{
        name: 'siba',
        city: 'bam'
    }])
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMsg: 'Help article not found',
        name: "Siba Panda"
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMsg: 'Page not found',
        name: "Siba Panda"
    })
})
app.listen(3000, () => {
    console.log('The server is Running on port 3000');
});
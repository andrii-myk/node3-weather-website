const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'This is my help message.',
        name: 'Andrew'
    })
})
app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})


app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: 'You must provide an adress!!!'
        })
    }
    geoCode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term!'
            
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'This hel page does not exist!',
        name: 'Andrew'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Page does not exist!',
        name: 'Andrew'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
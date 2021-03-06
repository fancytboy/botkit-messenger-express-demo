// modules =================================================
var express = require('express') // framework d'appli
var app = module.exports = express()
var bodyParser = require('body-parser') // BodyParser pour POST
var http = require('http').Server(app) // préparer le serveur web
var dotenv = require('dotenv')
var path = require('path')
i18n = require("i18n")

// configuration ===========================================

// load environment variables,
// either from .env files (development),
// heroku environment in production, etc...
dotenv.load()

i18n.configure({
    locales: ['en', 'iw', 'ta'],
    directory: __dirname + '/locales',
    defaultLocale: 'en'
});

app.use(express.static(path.join(__dirname, '/public')))

// parsing
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing url encoded

// view engine ejs
app.set('view engine', 'ejs')

// routes
require('./app/routes/routes')(app)

// port for Heroku
app.set('port', (process.env.PORT || 5000))

// START ===================================================
http.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'))
})

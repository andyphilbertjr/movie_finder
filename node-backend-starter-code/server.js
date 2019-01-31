//creates express app
const express = require('express')
const app = express()

//access file system
const fs = require('fs')
const path = require('path')

//middleware
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')


//middleware for request handling chain
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'views')))


//route handlers
app.use('/', indexRouter)

//views
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
//start server
app.set('port', process.env.PORT || 3000)
let server = app.listen(app.get('port'), () => {
    console.log( `server running localhost:${ app.get( 'port' ) }` );
});

app.use(function (err, request, response , next) {
    response.locals.message = err.message
    response.locals.error = request.app.get('env') === 'development' ? err : {};

    //show error page
    response.status(err.status || 500)
    response.render('error')
})

module.exports = app
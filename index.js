const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')

const app = express()

//to intialize logger middleware
//app.use(logger) 

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware to init save api or create a member
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//HOMEPAGE ROUTE- for handlebars
app.get('/',(req, res) => res.render('index', {
    title: 'Members App',
    members: members
}))

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

//if want to make static website
app.use(express.static(path.join(__dirname, 'public')))

//using router for member api
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
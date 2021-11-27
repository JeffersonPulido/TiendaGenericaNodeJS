const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

//CONECT BD
const { url } = require('./config/database.js');
mongoose.connect(url)
.then(db => console.log('DATABASE: ON'))
.catch(err => console.log(err));
//IMPORT ROUTES
const indexRoutes = require('./routes/routes');
//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret : 'apptiendagenerica',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
//ROUTES
app.use('/', indexRoutes);
//START SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
//404
app.use((req, res, next) => {
    res.status(404).render("404", { titulo: "Página 404" });
});
  
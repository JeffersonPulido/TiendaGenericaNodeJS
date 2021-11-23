const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//CONECT BD
mongoose.connect('mongodb://localhost/tiendagenerica')
.then(db => console.log('DB CONECTADO'))
.catch(err => console.log(err));
//IMPORT ROUTES
const indexRoutes = require('./routes/RClientes');
//SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//ROUTES
app.use('/', indexRoutes);
//START SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
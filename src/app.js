const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const csv = require("csvtojson");
const multer = require('multer');
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
app.use(express.urlencoded({ extended: false }));

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

//
//UPLOAD CSV
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, './public/uploads');
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname);
    }
});

const uploads = multer({storage:storage});
var temp;

app.post('/upCsv', uploads.single('csv'),(req,res) => {
    //CONVERTIR CSV A JSON
    csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
        console.log(jsonObj);
        for(var x=0; x<jsonObj; x++){
            temp = parseFloat(jsonObj[x].codigo_producto)
            jsonObj[x].codigo_producto = temp;
            temp = parseFloat(jsonObj[x].nombre_producto)
            jsonObj[x].nombre_producto = temp;
            temp = parseFloat(jsonObj[x].nitproveedor)
            jsonObj[x].nitproveedor = temp;
            temp = parseFloat(jsonObj[x].precio_compra)
            jsonObj[x].precio_compra = temp;
            temp = parseFloat(jsonObj[x].ivacompra)
            jsonObj[x].ivacompra = temp;
            temp = parseFloat(jsonObj[x].precio_venta)
            jsonObj[x].precio_venta = temp;
        }
        csvModel.insertMany(jsonObj, (err, data) => {
            if(err){
                console.log(err);
            }else{
                res.redirect('/productos')
            }
        });
    });
});
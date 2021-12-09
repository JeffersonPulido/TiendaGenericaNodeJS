const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const multipart = require('connect-multiparty')
const csv = require("csvtojson");
const multer = require('multer');

/**========================MODELS======================= */
const Cliente = require('../models/clients');
const Usuario = require('../models/users');
const Proveedor = require('../models/vendors');
const csvModel = require('../models/csv');
/**====================CONTROLLER=========================== */
const ventaController = require('../controllers/ventaController')
const reporteController = require('../controllers/reporteController')
const clienteController = require('../controllers/clienteController')
/**======================================================*/
/** REDIRECCIONES VISTAS */
//REDIRECCION INDEX
router.get('/', async (req, res) => {
    res.render('index');
});
//REDIRECCION LOGIN
router.get('/login', async (req, res) => {
    res.render('login');
});
//AUTENTICAR USUARIO
router.post('/authenticate', (req, res) => {
    const {usuario, password} = req.body;
    Usuario.findOne({usuario}, (err, user) => {
        if(err){
            res.render('500');
        }else if(!user){
            res.render('500');
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.render('500');
                }else if(result){
                    res.render('home');
                }else{
                    res.render('500');
                }
            });
        }
    });
})
//REDIRECCION SIGNUP
router.get('/signup', async (req, res) => {
    res.render('register');
});
//REDIRECCION HOME
router.get('/home', async (req, res) => {
    res.render('home');
});
//REDIRECCION REPORTES
router.get('/reportes', async (req, res) => {
    res.render('reportes');
});
//REPORTE CLIENTES
router.get('/listclientes', async (req, res) => {
    const clients = await Cliente.find();
    res.render('listclientes', {
        clients
    });
});
/**======================================================*/
/** CRUD CLIENTES */
//READ
router.get('/clientes', clienteController.mostrar)
//CREATE JSON
router.post('/clientes', clienteController.json)
//ADD
router.post('/clientes/crear', clienteController.crear)
//UPDATE LIST
router.get('/edit/:_id', async (req, res) => {
    const { _id } = req.params;
    const cliente = await Cliente.findById(_id);
    res.render('edit', {
        cliente
    });
});
//UPDATE CHANGE
router.post('/edit/:_id', async (req, res) => {
    const { _id } = req.params;
    await Cliente.update({ _id: _id }, req.body);
    res.redirect('/clientes');
});
//DELETE
router.get('/clientes/borrar/:id', clienteController.borrar)
/**======================================================*/
/**======================================================*/
/** CRUD USUARIOS */
//READ
router.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.find();
    res.render('usuarios', {
        usuarios
    });
});
//ADD
router.post('/register', async (req, res) => {
    const usuarios = new Usuario(req.body);
    await usuarios.save();
    res.redirect('/login');
});
//DELETE
router.get('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
    await Usuario.deleteOne({_id: id});
    res.redirect('/usuarios');
});
//UPDATE LIST
router.get('/editUser/:id', async (req, res) => {
    const { id } = req.params;
    const usuarios = await Usuario.findById(id);
    res.render('editUser', {
        usuarios
    });
});
//UPDATE CHANGE
router.post('/editUser/:id', async (req, res) => {
    const { id } = req.params;
    await Usuario.update({ _id: id }, req.body);
    res.redirect('/usuarios');
});
/**======================================================*/
/**======================================================*/
/** CRUD PROVEEDORES */
//READ
router.get('/proveedores', async (req, res) => {
    const proveedores = await Proveedor.find();
    res.render('proveedores', {
        proveedores
    });
});
//ADD
router.post('/addVendor', async (req, res) => {
    const proveedores = new Proveedor(req.body);
    await proveedores.save();
    res.redirect('/proveedores');
});
//DELETE
router.get('/deleteVendor/:id', async (req, res) => {
    const { id } = req.params;
    await Proveedor.deleteOne({_id: id});
    res.redirect('/proveedores');
});
//UPDATE LIST
router.get('/editVendor/:id', async (req, res) => {
    const { id } = req.params;
    const proveedores = await Proveedor.findById(id);
    res.render('editVendor', {
        proveedores
    });
});
//UPDATE CHANGE
router.post('/editVendor/:id', async (req, res) => {
    const { id } = req.params;
    await Proveedor.update({ _id: id }, req.body);
    res.redirect('/proveedores');
});
/**======================================================*/
/**======================================================*/
/** CRUD PRODUCTOS */
//ALMACENAMIENTO CSV 
var storage = multer.diskStorage({  
    destination:(req,file,cb)=>{  
        cb(null,'src/public/uploads');  
    },  
    filename:(req,file,cb)=>{  
        cb(null,file.originalname);  
    }  
}); 
//RUTA
var uploads = multer({storage:storage});  
//READ
router.get('/productos',(req,res)=>{  
    csvModel.find((err,data)=>{  
         if(err){  
             console.log(err);  
         }else{  
              if(data!=''){  
                  res.render('productos',{data:data});  
              }else{  
                  res.render('productos',{data:''});  
              }  
         }  
    });  
});
//CARGUE DE CSV
var temp ;  
router.post('/up',uploads.single('csv'),(req,res)=>{   
csv()  
.fromFile(req.file.path)  
.then((jsonObj)=>{  
    //console.log(jsonObj);  
    for(var x=0;x<jsonObj;x++){  
        temp = parseInt(jsonObj[x].codigo_producto)  
        jsonObj[x].codigo_producto = temp;  
        temp = jsonObj[x].nombre_producto  
        jsonObj[x].nombre_producto = temp;  
        temp = parseInt(jsonObj[x].nitproveedor)  
        jsonObj[x].nitproveedor = temp;  
        temp = parseFloat(jsonObj[x].precio_compra)  
        jsonObj[x].precio_compra = temp;  
        temp = parseFloat(jsonObj[x].ivacompra)  
        jsonObj[x].ivacompra = temp;
        temp = parseFloat(jsonObj[x].precio_venta)  
        jsonObj[x].precio_venta = temp;   
     } 
     csvModel.insertMany(jsonObj,(err,data)=>{  
            if(err){  
                console.log(err);  
            }else{  
                res.redirect('productos');  
            }  
     });  
   });  
});
//DELETE
router.get('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params;
    await csvModel.deleteOne({_id: id});
    res.redirect('/productos');
});
//UPDATE LIST
router.get('/editProduct/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await csvModel.findById(id);
    res.render('editProduct', {
        productos
    });
});
//UPDATE CHANGE
router.post('/editProduct/:id', async (req, res) => {
    const { id } = req.params;
    await csvModel.update({ _id: id }, req.body);
    res.redirect('/productos');
});
/**======================================================*/
/**===================================================== */
/** MODULO VENTAS */
router.get('/ventas', ventaController.mostrar)
router.post('/ventas/crear', ventaController.crear)
/** MODULO REPORTES */
router.get('/reportesTotal', reporteController.mostrarTotal)
/**===================================================== */
module.exports = router;
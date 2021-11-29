const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

/**========================MODELS======================= */
const Cliente = require('../models/clients');
const Usuario = require('../models/users');
const Proveedor = require('../models/vendors');
const Producto = require('../models/products');
/**===================================================== */
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
/**======================================================*/

/**======================================================*/
/** CRUD CLIENTES */
//READ
router.get('/clientes', async (req, res) => {
    const clients = await Cliente.find();
    res.render('clientes', {
        clients
    });
});

//ADD
router.post('/add', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.redirect('/clientes');
});

//DELETE
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Cliente.deleteOne({_id: id});
    res.redirect('/clientes');
});

//UPDATE LIST
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render('edit', {
        cliente
    });
});

//UPDATE CHANGE
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Cliente.update({ _id: id }, req.body);
    res.redirect('/clientes');
});
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
//READ
router.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.render('productos');
});
/**======================================================*/

//REGISTER
/**
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/register', (req, res) => {
    const {usuario, password} = req.body;
    const user = new User({usuario, password});
    user.save(err => {
        if(err){
            res.status(500).send('Error al registrar usuario');
        }else{
            res.status(200).send('Usuario Registrador');
        }
    });
});
*/
/**
app.post('/authenticate', (req, res) => {
    const {usuario, password} = req.body;
    user.findOne({usuario}, (err, user) => {
        if(err){
            res.status(500).send('Error al autenticar usuario');
        }else if(!user){
            res.status(500).send('Usuario no existe!');
        }else{
            user.isCorrectPassword(password, (err, result) => {
                if(err){
                    res.status(500).send('Error al autenticar usuario');
                }else if(result){
                    res.status(200).send('Usuario autenticado con exito!');
                }else{
                    res.status(500).send('Usuario y/o Contraseña incorrecta!');
                }
            });
        }
    });
})
*/
/**===================================================== */
module.exports = router;
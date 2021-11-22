const express = require('express');
const router = express.Router();

const Cliente = require('../models/clients');

//READ
router.get('/', async (req, res) => {
    const clients = await Cliente.find();
    res.render('index', {
        clients
    });
});

//ADD
router.post('/add', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.redirect('/');
});

//DELETE
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Cliente.deleteOne({_id: id});
    res.redirect('/');
});

//UPDATE LIST
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    res.render('edit', {
        cliente
    });
    //res.redirect('/');
});

//UPDATE CHANGE
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Cliente.update({ _id: id }, req.body);
    res.redirect('/');
});


module.exports = router;
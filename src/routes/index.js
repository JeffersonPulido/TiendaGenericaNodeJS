const express = require('express');
const router = express.Router();

const Cliente = require('../models/clients');

router.get('/', async (req, res) => {
    const clients = await Cliente.find();
    res.render('index', {
        clients
    });
});

router.post('/add', async (req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.redirect('/');
})

module.exports = router;
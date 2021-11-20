const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    cedula_cliente: Number,
    direccion_cliente: String,
    email_cliente: String,
    nombre_cliente: String,
    telefono_cliente: Number
});

module.exports = mongoose.model('db_clientes', ClientSchema);
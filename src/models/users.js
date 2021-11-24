const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    cedula_usuario: Number,
    email_usuario: String,
    nombre_usuario: String,
    password: String,
    usuario: String
});

module.exports = mongoose.model('db_usuarios', ClientSchema);
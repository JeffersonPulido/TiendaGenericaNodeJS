const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    nitproveedor: Number,
    ciudad_proveedor: String,
    direccion_proveedor: String,
    nombre_proveedor: String,
    telefono_proveedor: String
});

module.exports = mongoose.model('db_proveedores', ClientSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    codigo_producto: Number,
    nombre_producto: String,
    nitproveedor: Number,
    precio_compra: Number,
    ivacompra: Number,
    precio_venta: Number,
});

module.exports = mongoose.model('db_productos', ClientSchema);
const mongoose = require('mongoose');

const csvSchema = mongoose.Schema({
    codigo_producto:{
        type:Number
    },
    nombre_producto:{
        type:String
    },
    nitproveedor:{
        type:Number
    },
    precio_compra:{
        type:Number
    },
    ivacompra:{
        type:Number
    },
    precio_venta:{
        type:Number
    }
});

module.exports = mongoose.model('db_productos', csvSchema);
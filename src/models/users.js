const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    cedula_usuario: Number,
    email_usuario: String,
    nombre_usuario: String,
    password: String,
    usuario: String
});

ClientSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

ClientSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.ClientSchema.password)
}

module.exports = mongoose.model('db_usuarios', ClientSchema);
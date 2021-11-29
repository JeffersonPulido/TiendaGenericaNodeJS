const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const saltRounds = 10;

const ClientSchema = new Schema({
    cedula_usuario: Number,
    email_usuario: String,
    nombre_usuario: String,
    password: String,
    usuario: String
});

//Encriptar al añadir la clave
ClientSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) =>{
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
});

//Comparar claves
ClientSchema.methods.isCorrectPassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('db_usuarios', ClientSchema);
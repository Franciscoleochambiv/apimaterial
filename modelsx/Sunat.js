const { Schema, model } = require('mongoose');

const sunatSchema = new Schema(
    {   
        codigo:{ type: String },
        razonsocial:{ type: String },
        direccion:{ type: String },
        estado:{ type: String },
        ubigeo:{ type: String },
        habido:{ type: String },
        departamento:{ type: String },
        provincia:{ type: String },
        nombre:{ type: String }

    }, {
        timestamps: true
    });

module.exports = model('sunat', sunatSchema);
const { Schema, model } = require('mongoose');

const ResbolSchema = new Schema(
    {   

        title:{ type: String },
        rucemisor:{ type: String },
        content:{ type: String },
        date:{ type: String },
        author:{ type: String },
        serie:{ type: String },
        total:{ type: String },
        total_tax:{ type: String },
        grand_total:{ type: String },
        razonemisor:{ type: String },
        provincia:{ type: String },
        ciudad:{ type: String },
        distrito:{ type: String },
        diremisor:{ type: String },
        fecharchivo:{ type: String },
        fecha_de_emision:{ type: String },
        error:{ type: String },
        xml:{ type: String },
        cdr:{ type: String },
        estado:{ type: String },

        
    }, {
        timestamps: true
    });

module.exports = model('Resbol', ResbolSchema);
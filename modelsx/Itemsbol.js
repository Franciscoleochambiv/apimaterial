const { Schema, model } = require('mongoose');

const itembolSchema = new Schema(
    {   
        title:{ type: String },
        idnotes:{ type: String },
        dvc_numero:{ type: String },
        dvc_serie:{ type: String },
        condition:{ type: String },
        td_id:{ type: String },
        total:{ type: String },
        total_tax:{ type: String },
        grand_total:{ type: String },
        date: Date



    }, {
        timestamps: true
    });

module.exports = model('Itemsbol', itembolSchema);
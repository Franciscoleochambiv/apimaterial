const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
    {   
        idnotes:{ type: String },
        unidad_de_medida: { type: String },
        codigo: { type: String },
        descripcion: { type: String },
        cantidad: { type: String },
        valor_unitario: { type: String },
        precio_unitario: { type: String },
        descuento: { type: String },
        subtotal: { type: String },
        tipo_de_igv: { type: String },
        igv: { type: String },
        total: { type: String },
        anticipo_regularizacion: { type: String },
        anticipo_documento_serie: { type: String },
        anticipo_documento_numero: { type: String },
        date: Date
    }, {
        timestamps: true
    });

module.exports = model('Items', itemSchema);
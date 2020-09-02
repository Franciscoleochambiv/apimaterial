const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
    {
        title:{ 
            type:String,
            unique:true,
            required: true
        },
        idope:{ type: String },
        content: { type: String},
        author: { type: String },
        date:{ type: Date },
        serie: { type: String },
        numero: { type: String },
        fecha_de_emision: { type: String },
        total_letras: { type: String },
        rucemisor: { type: Number },
        proveedor: { type: String },
        razonemisor: { type: String },
        provincia: { type: String },
        ciudad: { type: String },
        distrito: { type: String },
        diremisor: { type: String },
        cliente_numero_de_documento: { type: String },
        cliente_denominacion: { type: String },
        cliente_direccion: { type: String },
        total_igv: { type: Number },
        total_gravada: { type: Number },
        total: { type: Number },
        tipo_de_comprobante: { type: String },
        fecha: { type: String },
        error: { type: String },
        pdf_zip_base64:{ type: String },
        xml_zip_base64:{ type: String },
        cdr_zip_base64:{ type: String },
        aceptada_por_sunat:{ type: String },
        sunat_soap_error:{ type: String },
        sunat_responsecode:{ type: String },
        aceptada_por_sunat:{ type: String },
        items:{ type : Array
            
          }
        
        
    }, {
        timestamps: true
    });

noteSchema.index({ title: 1 }, { unique: true});   

module.exports = model('Note', noteSchema);
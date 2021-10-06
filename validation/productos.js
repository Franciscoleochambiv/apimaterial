const Validator = require("validator");
const isEmpty = require("./is-empty.js");

module.exports = function validateTipoInput(data) {
  let errors = {};

  data.descripcion = !isEmpty(data.descripcion) ? data.descripcion : "";
  data.codigo = !isEmpty(data.codigo) ? data.codigo : "";
  data.categoria = !isEmpty(data.categoria) ? data.categoria : "";

  if (Validator.isEmpty(data.descripcion)) {
    errors.descripcion = "Debe Ingresar una  Descripcion";
  }

  if (Validator.isEmpty(data.codigo)) {                                
    errors.codigo = "Debe Ingresar Un codigo";
  }

  if (Validator.isEmpty(data.categoria)) {                                
    errors.categoria = "Debe Ingresar Una categoria";
  }


  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};


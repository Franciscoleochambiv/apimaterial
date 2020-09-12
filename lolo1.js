var seriec ='1';
      var numero_ticket='200';
      var fecha ='now()';
      var tdoc='30';
      var ncli='1';
      var pagado='0';
      var fpago="'CONTADO'";
      var observa="'onservaciones'";
      var vendedor="'taqyu'";
      var dvcanulado='0';
      var guia='0';
      var caja='1';
      var Empresa='1';
      var dvcnc='0';
      var serien='0';
      var dvcsaldo='0';
      var pendiente='0';

     var  cadena="Insert into DocVentaCabweb(DVC_Serie,DVC_Numero,DVC_Fecha,DVC_FechaIng,TD_ID,PVCL_ID,DVC_Pagado,DVC_FormaPago,DVC_Observaciones,DVC_Vendedor,DVC_Anulado,DVC_Guia,Alm_Id,Empresa,DVC_NC,serien,DVC_Saldo,Pendiente) values(";
     var  cadena2=cadena+seriec+","+numero_ticket+","+fecha+","+fecha+","+tdoc+","+ncli+","+pagado+","+fpago+","+observa+","+vendedor+","+dvcanulado+","+guia+","+caja+","+Empresa+","+dvcnc+","+serien+","+dvcsaldo+","+pendiente+")";


     console.log(cadena2);

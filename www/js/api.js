$(document).ready(function() {
 
  var url = "http://dkmatrizz.ddns.net/api.php?callback=?";
  //192.168.1.212
  //var url = "http://192.168.1.212/matrizV1/api.php?callback=?";
  
  $("#btnAcceder").click(function(){
     var idAgente = $('select[name=agente] option:selected').val();

     var dataString = "agente="+idAgente+"&login=";

      $.ajax({
        type: "POST",
        url: url,
        data: dataString,
        crossDomain: true,
        cache: false,
        beforeSend: function() {
          $("#btnAcceder").html('Accediendo...');
        },
        success: function(data) {
          if (data != "fail") {
            localStorage.login = "true";
            var json = data;
            for (var clave in json) {
              localStorage.idAgente = JSON.parse(json).idAgente;
              localStorage.nombre = JSON.parse(json).nombre;
           

            }

            swal({
              title: "RENTAAPP",
              text: "Bienvenido",
              icon: "info",
              button: true,
              dangerMode: false,
            })
            .then((willDelete) => {
              if (willDelete) {
                window.location.href = "inicio.html";

              }
            });

          } else if (data == "fail") {
            swal("Algo Salio Mal", "verificar usuario", "error");
            //alert("Error verifique su correo o contraseña");
            $("#btnAcceder").html('Acceder');
          }
        }
      });

     
  });

  /*LISTAR LAS ENTREGAS PENDIENTES*/
$('body').on('click', '.contenedorAccesos a', function(){

  var acceso = $(this).attr("class");
  if (acceso == "btnInicio") {
      window.location.href = "inicio.html";
  }else if (acceso == "btnEntregasPendientes") {

      var idAgente = localStorage.getItem("idAgente");
      var dataString = "idAgente="+idAgente+"&listaEntregasPendientes=";

       $.ajax({
          type: "POST",
          url: url,
          data: dataString,
          crossDomain: true,
          cache: false,
          beforeSend: function() {
            $(".pendientes").html("<div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div><div class='spinner'></div>");
            $(".spinner").show();
          },
          success: function(data) {
            if (data != "failed") {
              localStorage.listaEntregasPendientes = data;
              window.location.href = "entregasPendientes.html";
            }else{
               $(".spinner").hide();
              swal({
              
              text: "Aun no hay entregas asignadas",
              icon: "warning",
              button: true,
              dangerMode: false,
            })
            .then((willDelete) => {
              if (willDelete) {
                
                 $(".pendientes").html("<center><h3 id='subtitulos'>Entregas Pendientes</h3></center>");
              }
            });
            }
          }
        });
  }else if(acceso == "btnEntregasFinalizadas") {
      

      var idAgente = localStorage.getItem("idAgente");
      var dataString = "idAgente="+idAgente+"&listaEntregasFinalizadas=";

       $.ajax({
          type: "POST",
          url: url,
          data: dataString,
          crossDomain: true,
          cache: false,
          beforeSend: function() {
            $(".finalizadas").html("<div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div><div class='spinner'></div>");
            $(".spinner").show();
          },
          success: function(data) {
            if (data != "failed") {
              localStorage.listaEntregasFinalizadas = data;
              window.location.href = "entregasFinalizadas.html";
            }else{
              
              $(".spinner").hide();
              swal({
              
              text: "Aun no hay entregas finalizadas",
              icon: "warning",
              button: true,
              dangerMode: false,
            })
            .then((willDelete) => {
              if (willDelete) {
                //window.location.href = "inicio.html";
                 $(".finalizadas").html("<center><h3 id='subtitulos'>Entregas Finalizadas</h3></center>");
              }
            });
             
            }
          }
        });
      

  }

});


  /*LISTAR LAS ENTREGAS PENDIENTES*/


});
$("#tableDetailDelivery").on("click", ".btnDetailDelivery", function(){

    var idEntrega = $(this).attr("id");
    localStorage.setItem("idEntrega",idEntrega);

     var dataString = "idEntregaDetalle="+idEntrega+"&detalleEntregaVista=";

       $.ajax({
          type: "POST",
          url: "http://192.168.1.245/matrizV1/api.php?callback=?",
          data: dataString,
          crossDomain: true,
          cache: false,

          beforeSend: function() {
            $("#"+idEntrega+"vista").html("<div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div><div class='spinner'></div>");
            $(".spinner").show();
          },
          success: function(data) {
            if (data != "failed") {
              
              localStorage.detalleEntrega = data;
              window.location.href ="detalleEntrega.html";
              
            }else{
              
              $(".spinner").hide();
              swal({
              
              text: "No pudimos obtener los datos de la entrega",
              icon: "warning",
              button: true,
              dangerMode: false,
            })
            .then((willDelete) => {
              if (willDelete) {
                
              }
            });
             
            }
          }
        });
    

});
$("#tableDetailDeliveryFinish").on("click", ".btnDetailDelivery", function(){

    var idEntrega = $(this).attr("id");

     var dataString = "idEntregaDetalle="+idEntrega+"&detalleEntregaVista=";

       $.ajax({
          type: "POST",
          url: "http://192.168.1.245/matrizV1/api.php?callback=?",
          data: dataString,
          crossDomain: true,
          cache: false,

          beforeSend: function() {
            $("#"+idEntrega+"vista").html("<div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div><div class='spinner'></div>");
            $(".spinner").show();
          },
          success: function(data) {
            if (data != "failed") {
              localStorage.detalleEntrega = data;
              window.location.href ="detalleEntrega.html";
              
            }else{
              
              $(".spinner").hide();
              swal({
              
              text: "No pudimos obtener los datos de la entrega",
              icon: "warning",
              button: true,
              dangerMode: false,
            })
            .then((willDelete) => {
              if (willDelete) {
                
              }
            });
             
            }
          }
        });
    

});
$("#tableFacturasDelivery").on("click", ".btnUpdateDelivery", function(){
    $direccion = document.querySelector("#direccion");

    var idMovimiento = $(this).attr("id");
    
    var idFactura = $(this).attr("idFactura");
    var arregloFactura = idFactura.split(",");
    var arregloFacturas = arregloFactura;

    
    var idEntregaFactura = $(this).attr("idEntrega");
    var horaInicio = $("#horaInicio"+idMovimiento+"").val();
    var horaFinal = $("#horaFinal"+idMovimiento+"").val();

    
    $.when(funcionInit()).then(functionSend(idMovimiento,arregloFacturas,idEntregaFactura,horaInicio,horaFinal));
    

    function functionSend(idMovimiento,arregloFacturas,idEntregaFactura,horaInicio,horaFinal){
   
    var latitud = localStorage.getItem("latitudOperador");
    var longitud = localStorage.getItem("longitudOperador");
    var ubicacion = localStorage.getItem("autocomplete"); 

  
     var dataString = "idFactura="+arregloFacturas+"&idEntregaFactura="+idEntregaFactura+ "&idMovimiento="+idMovimiento+"&horaInicio="+horaInicio+"&horaFinal="+horaFinal+"&latitud="+latitud+"&longitud="+longitud+"&ubicacion="+ubicacion+"&actualizarHorarioEntrega=";

       $.ajax({
          type: "POST",
          url: "http://192.168.1.245/matrizV1/api.php?callback=?",
          data: dataString,
          crossDomain: true,
          cache: false,

          beforeSend: function() {

            document.getElementById("pageLoadEdit").style.display = "";

              $("#pageLoadEdit").html("<div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div><div class='spinner'></div>");
              $(".spinner").show();
            
          },
          success: function(data) {
            if (data != "failed") {
              

              var dataString = "idEntregaDetalle="+idEntregaFactura+"&detalleEntregaVista=";
                $.ajax({
                type: "POST",
                url: "http://192.168.1.245/matrizV1/api.php?callback=?",
                data: dataString,
                crossDomain: true,
                cache: false,

                beforeSend: function() {

                  document.getElementById("pageLoadEdit").style.display = "";

                  $("#pageLoadEdit").html("<div class='sk-chase'><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div><div class='sk-chase-dot'></div></div><div class='spinner'></div>");
                  $(".spinner").show();
                 
                },
                success: function(data) {
                  if (data != "failed") {
                    localStorage.detalleEntrega = data;
                    window.location.href ="detalleEntrega.html";
                    
                  }else{
                    
             
                   
                  }
                }
              });
         
              
            }else{
              
             
              
              swal({
              
              text: "No pudimos actualizar",
              icon: "warning",
              button: true,
              dangerMode: false,
            })
            .then((willDelete) => {
              if (willDelete) {
                
              }
            });
             
            }
          }
        });
        
        
    }
 

});
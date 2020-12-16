  const funcionInit = () => {
  	if (!"geolocation" in navigator) {
  		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
  	}

  	const $latitud = document.querySelector("#latitud"),
  		$longitud = document.querySelector("#longitud");
  	


  	const onUbicacionConcedida = ubicacion => {

  		const coordenadas = ubicacion.coords;
  		var coordenada = localStorage.getItem("latitudOperador");
  		if (coordenada === null) {
  			localStorage.setItem("latitudOperador",coordenadas.latitude);
  			localStorage.setItem("longitudOperador",coordenadas.longitude);
       
        var geocoder = new google.maps.Geocoder;
        geocodeLatLng(geocoder,coordenadas.latitude,coordenadas.longitude);
     

  		}else{
        localStorage.setItem("latitudOperador",coordenadas.latitude);
  			localStorage.setItem("longitudOperador",coordenadas.longitude);

        var geocoder = new google.maps.Geocoder;
        geocodeLatLng(geocoder,coordenadas.latitude,coordenadas.longitude);
        
        

  		}
  			$latitud.innerText = coordenadas.latitude;
  			$longitud.innerText = coordenadas.longitude;
  	}
  	const onErrorDeUbicacion = err => {

  		$latitud.innerText = "Error obteniendo ubicación: " + err.message;
  		$longitud.innerText = "Error obteniendo ubicación: " + err.message;
  		console.log("Error obteniendo ubicación: ", err);
  	}

  	const opcionesDeSolicitud = {
  		enableHighAccuracy: true, // Alta precisión
  		maximumAge: 0, // No queremos caché
  		timeout: 40000 // Esperar solo 5 segundos
  	};

  	$latitud.innerText = "Cargando...";
  	$longitud.innerText = "Cargando...";
  	navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
    



  };

  function geocodeLatLng(geocoder,lat,long) {

             var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
             geocoder.geocode({'location': latlng}, function(results, status) {
               if (status === 'OK') {
                 if (results[0]) {

                  var direccion = localStorage.getItem("autocomplete");

                  if (direccion === null) {

                   localStorage.setItem("autocomplete",results[0].formatted_address);
                   $direccion.innerText = results[0].formatted_address
                  

                  }else{

                    localStorage.setItem("autocomplete",results[0].formatted_address);
                     $direccion.innerText = results[0].formatted_address
                    
                  }

                 } else {
                   //window.alert('No results found');
                 }
               } else {
                 console.log('Geocoder failed due to: ' + status);
                 //window.alert();
               }
             });
           }
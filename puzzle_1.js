var icono;

function comenzar(){

	var iconDrag = document.getElementsByClassName("icon");
	for(var i=0; i<iconDrag.length; i++){
		iconDrag[i].addEventListener("dragstart", comenzamos_arrastrar, false);		
	}

	var dropzone = document.getElementsByClassName("dropzone");
	
	for(var i=0; i<dropzone.length; i++){
		dropzone[i].addEventListener("dragenter", porEncima, false);
		dropzone[i].addEventListener("dragleave", iconoSale, false);
		dropzone[i].addEventListener("dragover", function(e){
			e.preventDefault();
		}, false);
		dropzone[i].addEventListener("drop", soltado, false);	
	}
}

function comenzamos_arrastrar(e){
	//Especificar qué tiene que hacer el objeto del evento
	e.dataTransfer.effectAllowed = 'move';
	//Comparte la información del objeto del evento (comparte id)
	e.dataTransfer.setData('iconoDragId', e.target.id);
	//Posición del puntero cuando arrastramos la imagen
	icono = e.target.src;
	iconosrc = icono.substring(icono, -4)
	console.log(iconosrc)
	e.dataTransfer.setDragImage(e.target,0,-30);
}

function soltado(e) {
	//Muestra el icono que emite el evento drop
	var nodo= e.target.id;
	//Asignación a variable de id del evento que se arrastra
	var iconId = e.dataTransfer.getData('iconoDragId');
	var icon = document.getElementById(iconId);
	e.target.appendChild(icon);
	var dropzonePadre = e.target.parentNode.classList.remove("aumentado");
	e.stopPropagation();
}

function porEncima(e){

}

function iconoSale(e){

}

function resultado(){

	var puntacion = document.getElementById("puntuacion");
	puntacion.innerHTML= 0;

	var divsDrop = document.getElementsByClassName("divDrop");

	for(var i=0; i<divsDrop.length; i++){
		var divDrop = divsDrop[i];
		var zonadropeo = divDrop.lastElementChild;

		var zonadropeoID = zonadropeo.id;
		zonadropeoConfig = document.getElementById(zonadropeoID);

		if(zonadropeo.children.length > 0){


			var iconoDragID = zonadropeoConfig.firstElementChild.id;	
			var substrZDrop = zonadropeoID.substring(zonadropeoID.indexOf("-",0)+1);
			var substrIconoDrag = iconoDragID.substring(iconoDragID.indexOf("-",0)+1);

			divDrop.children[0].setAttribute("class", "check visible");

			zonadropeoConfig.style.backgroundSize = "0%";

			if(substrZDrop == substrIconoDrag){
				zonadropeo.previousElementSibling.src = "imgPractica/check_green.png";
				
				puntacion.innerHTML= parseInt(puntacion.innerHTML)+1;
				
			
			}else{
				zonadropeoConfig.previousElementSibling.src = "imgPractica/check_red.png";
			}

		}else{
			divDrop.children[0].classList.remove("visible");
			divDrop.children[0].classList.add("novisible");
			zonadropeoConfig.style.backgroundSize = "90% auto";
			//console.log(asdn)
		}	
	}
}

setInterval(resultado, 1)
window.addEventListener("load", comenzar, false)

var dropzone = $(".dropzone_pr2");

function redimensionar(){
	dropzone.each(function(){
		elem = $(this);
		widthDropeo = elem.width();
		heightDropeo = (widthDropeo*16.6)/100;
		elem.height(heightDropeo+"px");
	});		
}

function comenzar(){
	var iconDrag = document.getElementsByClassName("icon");
	for(var i=0; i<iconDrag.length; i++){
		iconDrag[i].addEventListener("dragstart", comenzamos_arrastrar, false);
	}
	
	var dropzone = document.getElementsByClassName("dropzone_pr2");

	for(i=0; i<dropzone.length; i++){
		dropzone[i].addEventListener("dragover", function(e){
			e.preventDefault();
		}, false);
		dropzone[i].addEventListener("drop", soltado, false);	
	}
}


function soltado(e){
	var iconId = e.dataTransfer.getData('iconoDragId');
	var icon = document.getElementById(iconId);
	var iconSrc = icon.src;
	var iconSrcInd = iconSrc.indexOf("imgPractica");
	var iconSrcLe = iconSrc.length;
	var res = iconSrc.substring(iconSrcLe, iconSrcInd)
	
	var elemQueRecibe = e.target;
	elemQueRecibe.style.backgroundImage = "url('"+res+"')";
}

function comenzamos_arrastrar(e){
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData("iconoDragId", e.target.id);
	e.dataTransfer.setDragImage(e.target,0,-30);
}

var elem_comprobar = document.getElementById("comprobar");
elem_comprobar.style.display = "none";
var array_drop = [];
var resultado_total = 0;
var compr_archivo = document.getElementById("compr_archivo");

function resultado(){
	var divs_drop = document.getElementsByClassName("dropzone_pr2");
	var hay_imagen = 0;

	for(var i=0; i<divs_drop.length; i++){
		var div_drop = divs_drop[i];
		var div_drop_id = div_drop.id;
		
		if(div_drop.style.backgroundImage != ""){
			//console.log("El elemento " + i + " SI tiene imagen");
			var imagen = div_drop.style.backgroundImage;
			console.log(imagen)
			var numero_img = imagen.substring(22,23);
			var numero_div_id = div_drop_id.substring(8,9);
			hay_imagen ++;

			if(numero_div_id == numero_img){
				//console.log("La imagen y el div coinciden")
				if(array_drop[i]==undefined){
					array_drop[i]=true;
				}
			}else{
				//console.log("NO COINCIDEN")
			}
		}else{
			//console.log("El elemento " + i + " NO tiene imagen");
		}

		//Comprobar si el archivo es el puzzle_4 o no

		if(compr_archivo.style.background == "green"){
			if(hay_imagen == 10){
				elem_comprobar.style.display = "block";
			}
		}else{
			if(hay_imagen == 6){
				elem_comprobar.style.display = "block";
			}
		}
	}
	
	var resultado_bucle = 0;

	//Comprobar si el archivo es el puzzle_4 o no

	if(compr_archivo.style.background == "green"){
		for(var y=0; y<10; y++){
			console.log(y + " " + array_drop[y]);
			
			if(array_drop[y]!=undefined){
				resultado_bucle++;
			}
		}
	}else{
		for(var y=0; y<6; y++){
			console.log(y + " " + array_drop[y]);
			
			if(array_drop[y]!=undefined){
				resultado_bucle++;
			}
		}
	}

	resultado_total=resultado_bucle;
	console.log(resultado_total);
}

elem_comprobar.addEventListener("click", saber_resultado, false);

function saber_resultado(){
	document.getElementById("resultado_total").innerHTML = "Has acertado un total de " + resultado_total + " de 6";
}

var shuffleDropzones = function() {
	var dropzoneHolder = document.getElementById('icons_drag');
	var dropzones = dropzoneHolder.children;

	var fragment = document.createDocumentFragment();
	while (dropzones.length) {
		fragment.appendChild(dropzones[Math.floor(Math.random() * dropzones.length)]);
	}
	dropzoneHolder.appendChild(fragment);

}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$('#div_resetear').click(function() {
    location.reload();
});

$('#btn_aceptar').click(function() {
    location.reload();
});



window.addEventListener("load", redimensionar, false);
window.addEventListener("load", comenzar, false);
window.addEventListener("load", shuffleDropzones, false);
$(window).resize(redimensionar)
setInterval(resultado,500);

/*
	Redimensionar zona dropeo:
	100 %  - 582
	16.6 % - 97
*/

			var start = function(e) {
				//Especificar qué tiene que hacer el objeto del evento
				e.dataTransfer.effectAllowed = 'move';
				//Comparte la información del objeto del evento (comparte id)
				e.dataTransfer.setData('iconId', e.target.id);
				//Posición del puntero cuando arrastramos la imagen
				e.dataTransfer.setDragImage(e.target, 0, 0);
				//return true;
			}
/*
			borrado en dropzona-container y en todos los class=dropzone: ondragenter="return enter(event)"

			var enter = function(e) {
				return true;
			}
*/
			var over = function(e) {
				var iconoCapturador = e.dataTransfer.getData('iconData');
				var targetId = e.target.id;
				return false;
			}

			var drop = function(e) {

				var nodo= e.target.id;
				var iconId = e.dataTransfer.getData('iconId');
				var icon = document.getElementById(iconId);
				console.log("nodo: \n" + nodo)
				console.log("icon: \n" + iconId)
				e.target.appendChild(icon);
				e.stopPropagation();
				//return false;
			}
/*
			var end = function(e) {
				e.dataTransfer.clearData('iconId');
				//return true;
			}
*/
			var pollResults = function() {
				var score = document.getElementById('score');
				score.innerHTML = 0;

				var cuadrosSoltar = document.getElementsByClassName('cuadroSoltar')


				for (var i = 0; i < cuadrosSoltar.length; ++i) {
					var cuadroSoltar = cuadrosSoltar[i];
					var dropzone = cuadroSoltar.lastElementChild;
					

					//Si una de las dropzones del array ha recibido una imagen...(si la tiene, dentro de su div, incluye una imagen)
					if (dropzone.children.length > 0) {
						//Borrar el nombre de los alimentos cuando se suelta la imagen sobre de un dropzone correcto
						dropzone.style.backgroundSize = '0%';

						//Se guarda el id de la dropzone
						var dropzoneId = dropzone.id;
						//Se guarda el id del icono dentro de dropzone
						var iconId = dropzone.firstElementChild.id;

								      //dropzone-bananas.substring(9)
								      //dropzoneName=bananas
						var dropzoneName = dropzoneId.substring(dropzoneId.indexOf('-') + 1);
						var iconName = iconId.substring(iconId.indexOf('-') + 1);

						//Añadir la clase al elemento hermano anterior
						dropzone.previousElementSibling.setAttribute('class', 'answer show');

						if (iconName == dropzoneName) {
							dropzone.previousElementSibling.src = 'img/correct-green.png';
							score.innerHTML = parseInt(score.innerHTML) + 1;
						} else {
							dropzone.previousElementSibling.src = 'img/wrong-red.png';
						}
					} else {
						dropzone.previousElementSibling.setAttribute('class', 'answer hide');
						dropzone.style.backgroundSize = '100% auto';
					}
				}

				if (parseInt(score.innerHTML) == 10) {
					alert('Congratulations! You won the game!\nClick OK to restart.');
					location.reload();
				}
			}

			setInterval(pollResults, 50);

			//Posición aleatoria para los iconos
			var shuffleIcons = function() {
				var dropzoneContainer = document.getElementById('dropzone-container');
				var icons = dropzoneContainer.children;
				var fragment = document.createDocumentFragment();
				while (icons.length) {
					fragment.appendChild(icons[Math.floor(Math.random() * icons.length)]);
				}
				dropzoneContainer.appendChild(fragment);
			}

			//Posición aleatoria para las dropzones
			var shuffleDropzones = function() {
				var dropzoneHolder = document.getElementById('dropzone-holder');
				var dropzones = dropzoneHolder.children;
				var fragment = document.createDocumentFragment();
				while (dropzones.length) {
					fragment.appendChild(dropzones[Math.floor(Math.random() * dropzones.length)]);
				}
				dropzoneHolder.appendChild(fragment);
			}

			window.onload = function() {
				shuffleIcons();
				shuffleDropzones();
			}
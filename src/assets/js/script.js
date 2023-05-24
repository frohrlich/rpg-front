/**
 * Canvas game script
 */

// ______Définition de la "boîte" dans laquelle le jeu est affiché______

// let testCharPosX = 0;
// let testCharPosY = 0;

// move arrows size
let arrowSize = 60;

let canvasWidth = 600;
let canvasHeight = 400;
let textfontSize = 20; // font size for main text box and options

let start, previousTimeStamp, lastFrameTimeStamp;

let previousVue = null;

let interfacePosY = 300; // y position of interface

// Position de départ du joueur
let charStartPosX = 130; // selon l'axe x
let charStartPosY = 130; // selon l'axe y

// Position de départ du pnj
let pnjStartPosX = canvasWidth - 140; // selon l'axe x
let pnjStartPosY = 130; // selon l'axe y

let limitMovementX = 10; // moving space for character animation
let directionChar = 1,
	directionPnj = -1; // starting moving direction 1 right, -1 left
let charactersAnimationFrameRate = 75;

// ______Game startup______

// window.addEventListener("DOMContentLoaded", () => {
// 	startGame(); // initialize game client-side
// 	connect(); // connect to websocket server
// })

function startGame() {

	myCharacter = new component(
		0,
		0,
		"",
		charStartPosX,
		charStartPosY,
		"image",
	);

	myCharacterInfo = new component(
		120,
		75,
		"green",
		5,
		5,
		"textBox",
		""
	);

	myPnj = new component(
		0,
		0,
		"",
		pnjStartPosX,
		pnjStartPosY,
		"image"
	);

	myPnjInfo = new component(
		120,
		75,
		"red",
		canvasWidth - 5 - 120,
		5,
		"textBox",
		"",
		hidden = true
	);

	myMainTextBox = new component(
		360,
		96,
		"black",
		5,
		interfacePosY,
		"textBox",
		""
	);

	myOption1 = new component(
		225,
		30,
		"black",
		370,
		interfacePosY,
		"textBox",
		""
	);
	myOption2 = new component(
		225,
		30,
		"black",
		370,
		interfacePosY + 33,
		"textBox",
		""
	);
	myOption3 = new component(
		225,
		30,
		"black",
		370,
		interfacePosY + 66,
		"textBox",
		""
	);

	myBackground = new component(
		canvasWidth,
		canvasHeight,
		"",
		0,
		0,
		"background"
	);

	myMap = new component(
		0,
		0,
		"",
		canvasWidth - 185,
		5,
		"map",
		"",
		hidden = true,
		mapInfo = []
	);

	myLeftMoveArrow = new component(
		0,
		0,
		serverPath + "img/left-arrow.png",
		0,
		canvasHeight / 2,
		"image",
		"",
		hidden = true
	);

	myDownMoveArrow = new component(
		0,
		0,
		serverPath + "img/down-arrow.png",
		canvasWidth / 2 - arrowSize / 2,
		interfacePosY - 50,
		"image",
		"",
		hidden = true
	);

	myUpMoveArrow = new component(
		0,
		0,
		serverPath + "img/up-arrow.png",
		canvasWidth / 2 - arrowSize / 2,
		0,
		"image",
		"",
		hidden = true
	);

	myRightMoveArrow = new component(
		0,
		0,
		serverPath + "img/right-arrow.png",
		canvasWidth - arrowSize,
		canvasHeight / 2,
		"image",
		"",
		hidden = true
	);

	myGameArea.start();
}

let myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = canvasWidth;
		this.canvas.height = canvasHeight;
		this.context = this.canvas.getContext("2d");
		document.body.innerHTML="";
		this.canvas.style = "margin-left:10px; margin-top:10px";
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		window.addEventListener('click', function(e) {
			myGameArea.x = e.pageX;
			myGameArea.y = e.pageY;
		})
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};

// any component of the game (sprite, dialog box...)
function component(width, height, colorImage, x, y, type, text = null, hidden = false, mapInfo = null, charPosX = 0, charPosY = 0) {

	// positions of character on game map
	this.charPosX = charPosX;
	this.charPosY = charPosY;

	this.type = type;
	this.hidden = hidden;
	this.mapInfo = mapInfo;

	if (type == "image" || type == "background") {
		this.image = new Image();
		this.image.src = colorImage;
		if (type == "image") {
			this.image.addEventListener("load", () => {
				this.width = this.image.naturalWidth / 2;
				this.height = this.image.naturalHeight / 2;
			})
		}
	}
	if (type != "image") {
		this.width = width;
		this.height = height;
	}

	this.color = colorImage;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.text = text;
	this.update = function() {
		// first, check if component is hidden
		// if so, don't draw it
		if (!this.hidden) {
			ctx = myGameArea.context;
			if (this.type == "image" || this.type == "background") {
				ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			} else if (this.type == "text") {
				ctx.font = this.width + " " + this.height;
				ctx.fillStyle = colorImage;
				ctx.fillText(this.text, this.x, this.y);
			} else if (this.type == "textBox") {
				drawTextBox(ctx, this.text, this.x, this.y, this.width, this.height, this.color);
			} else if (this.type == "map") {
				drawMap(ctx, this.x, this.y, this.mapInfo, this.charPosX, this.charPosY);
			} else if (this.type == "leftMoveArrow") {
				drawLeftMoveArrow(ctx, this.x, this.y);
			} else if (this.type == "downMoveArrow") {
				drawDownMoveArrow(ctx, this.x, this.y);
			} else if (this.type == "upMoveArrow") {
				drawUpMoveArrow(ctx, this.x, this.y);
			} else if (this.type == "rightMoveArrow") {
				drawRightMoveArrow(ctx, this.x, this.y);
			} else {
				ctx.fillStyle = colorImage;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
	};
	this.clicked = function() {
		// first check if hidden
		// if so, can't be clicked
		if (this.hidden) {
			return false;
		}
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var clicked = true;
		if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
			clicked = false;
		}
		return clicked;
	};
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	};
}

// __________MAIN LOOP__________

function updateGameArea(timestamp) {
	if (start === undefined) {
		start = timestamp;
		lastFrameTimeStamp = timestamp;
	}
	//const elapsed = timestamp - start;

	myGameArea.stopMain = window.requestAnimationFrame(updateGameArea);

	myGameArea.clear();

	myCharacter.speedX = 0;
	myCharacter.speedY = 0;
	myPnj.speedX = 0;
	myPnj.speedY = 0;

	// CHARACTERS ANIMATION
	if (timestamp - lastFrameTimeStamp >= charactersAnimationFrameRate) {
		if (
			myCharacter.x > charStartPosX + limitMovementX ||
			myCharacter.x < charStartPosX
		) {
			directionChar *= -1; // change direction if out of bound
		}

		// moving animation pnj
		if (myPnj.x < pnjStartPosX - limitMovementX || myPnj.x > pnjStartPosX) {
			directionPnj *= -1; // change direction if out of bound
		}

		myCharacter.speedX += directionChar;
		myPnj.speedX += directionPnj;
		lastFrameTimeStamp = timestamp; // time of last animation frame
	}

	// checks if user clicked somewhere on game area
	if (myGameArea.x && myGameArea.y) {
		if (myOption1.clicked()) {
			// Send click info to server
			sendClick("option1");
		}
		else if (myOption2.clicked()) {
			sendClick("option2");
		}
		else if (myOption3.clicked()) {
			sendClick("option3");
		}
		else if (myLeftMoveArrow.clicked()) {
			sendClick("flecheO");
		}
		else if (myRightMoveArrow.clicked()) {
			sendClick("flecheE");
		}
		else if (myUpMoveArrow.clicked()) {
			sendClick("flecheN");
		}
		else if (myDownMoveArrow.clicked()) {
			sendClick("flecheS");
		}
		myGameArea.x = 0; // reset click position
		myGameArea.y = 0;
	}

	myBackground.update();
	myMainTextBox.update();
	myOption1.update();
	myOption2.update();
	myOption3.update();
	myMap.update();
	myLeftMoveArrow.update();
	myDownMoveArrow.update();
	myUpMoveArrow.update();
	myRightMoveArrow.update();
	myCharacter.newPos();
	myCharacter.update();
	myCharacterInfo.update();
	myPnj.newPos();
	myPnj.update();
	myPnjInfo.update();
}

// updates view with response from server
function update(vueInfo) {

	// everything hidden by default
	myLeftMoveArrow.hidden = true;
	myDownMoveArrow.hidden = true;
	myUpMoveArrow.hidden = true;
	myRightMoveArrow.hidden = true;
	myMap.hidden = true;
	myPnj.hidden = true;
	myPnjInfo.hidden = true;

	// we show map if present in view
	if (Object.hasOwn(vueInfo, 'carte')) {
		myMap.mapInfo = vueInfo.carte.maCarte;
		myMap.charPosX = vueInfo.joueur.personnage.positionX;
		myMap.charPosY = vueInfo.joueur.personnage.positionY;

		// if not already at left border of the map
		if (myMap.charPosX != 0) {
			// then show left move arrow
			myLeftMoveArrow.hidden = false;
		} else {
			myLeftMoveArrow.hidden = true;
		}
		// same for right side of the map
		if (myMap.charPosX != myMap.mapInfo.length - 1) {
			myRightMoveArrow.hidden = false;
		} else {
			myRightMoveArrow.hidden = true;
		}
		if (myMap.charPosY != 0) {
			myUpMoveArrow.hidden = false;
		} else {
			myUpMoveArrow.hidden = true;
		}
		if (myMap.charPosY != myMap.mapInfo[0].length - 1) {
			myDownMoveArrow.hidden = false;
		} else {
			myDownMoveArrow.hidden = true;
		}

		myMap.hidden = false;
	}


	// if player present on current view we show its infobox
	if (Object.hasOwn(vueInfo, 'joueur')) {
		myCharacterInfo.text = vueInfo.joueur.personnage.nom
			+ "      niveau " + vueInfo.joueur.personnage.niveau
			+ "     " + Math.max(vueInfo.joueur.personnage.pv, 0) + "/"
			+ vueInfo.joueur.personnage.pvMax + " pv";
		// if player image different from previous view we refresh the image
		if (previousVue === null || !Object.hasOwn(previousVue, 'joueur') || (previousVue.joueur.personnage.apparence != vueInfo.joueur.personnage.apparence)) {
			myCharacter = new component(
				0,
				0,
				serverPath + vueInfo.joueur.personnage.apparence,
				myCharacter.x,
				myCharacter.y,
				"image"
			);
		}
	}

	// if pnj present on current view we show its infobox
	if (Object.hasOwn(vueInfo, 'pnj') && vueInfo.pnj != null) {
		myPnjInfo.text = vueInfo.pnj.personnage.nom
			+ "      niveau " + vueInfo.pnj.personnage.niveau
			+ "     " + Math.max(vueInfo.pnj.personnage.pv, 0) + "/"
			+ vueInfo.pnj.personnage.pvMax + " pv";
		// if pnj image different from previous view we refresh the image
		if (previousVue === null || !Object.hasOwn(previousVue, 'pnj') || previousVue.pnj == null || (previousVue.pnj.personnage.apparence != vueInfo.pnj.personnage.apparence)) {
			myPnj = new component(
				0,
				0,
				serverPath + vueInfo.pnj.personnage.apparence,
				myPnj.x,
				myPnj.y,
				"image",
			);
		}
	} else {
		// if pnj not present, we hide its infobox
		myPnj.hidden = true;
		myPnjInfo.hidden = true;
	}

	// hide pnj info and image if in move view
	if (myMap.hidden == false) {
		myPnj.hidden = true;
		myPnjInfo.hidden = true;
	} else {
		myPnj.hidden = false;
		myPnjInfo.hidden = false;		
	}

	// same for background : refresh only if changed
	if (Object.hasOwn(vueInfo, 'background') && (previousVue === null || (previousVue.background != vueInfo.background))) {
		myBackground = new component(
			canvasWidth,
			canvasHeight,
			serverPath + vueInfo.background,
			0,
			0,
			"background"
		);
	}

	myMainTextBox.text = vueInfo.texte;

	if (vueInfo.options.length > 0) {
		myOption1.hidden = false;
		myOption1.text = vueInfo.options[0].texte;
	} else {
		myOption1.hidden = true;
	}
	if (vueInfo.options.length > 1) {
		myOption2.hidden = false;
		myOption2.text = vueInfo.options[1].texte;
	} else {
		myOption2.hidden = true;
	}
	if (vueInfo.options.length > 2) {
		myOption3.hidden = false;
		myOption3.text = vueInfo.options[2].texte;
	} else {
		myOption3.hidden = true;
	}

	previousVue = vueInfo;
}

// draw a simple textbox
function drawTextBox(ctx, text, posX, posY, tailleX, tailleY, color) {
	ctx.fillStyle = "white";
	rectArrondi(
		ctx,
		posX,
		posY,
		tailleX,
		tailleY,
		5,
		(fill = true)
	);
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1;
	rectArrondi(ctx, posX, posY, tailleX, tailleY, 5);
	ctx.font = textfontSize + "px serif";
	let lines = getLines(ctx, text, tailleX - 10);
	ctx.fillStyle = color; // text color
	for (let i = 0; i < lines.length; i++) {
		ctx.fillText(lines[i], posX + 5, posY + textfontSize * (i + 1));
	}
}

// Une fonction utilitaire pour tracer des rectangles avec des coins arrondis
function rectArrondi(ctx, x, y, largeur, hauteur, rayon, fill = false) {
	ctx.beginPath();
	ctx.moveTo(x, y + rayon);
	ctx.lineTo(x, y + hauteur - rayon);
	ctx.quadraticCurveTo(x, y + hauteur, x + rayon, y + hauteur);
	ctx.lineTo(x + largeur - rayon, y + hauteur);
	ctx.quadraticCurveTo(
		x + largeur,
		y + hauteur,
		x + largeur,
		y + hauteur - rayon
	);
	ctx.lineTo(x + largeur, y + rayon);
	ctx.quadraticCurveTo(x + largeur, y, x + largeur - rayon, y);
	ctx.lineTo(x + rayon, y);
	ctx.quadraticCurveTo(x, y, x, y + rayon);
	if (fill) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
}

// line split to fit in text box
function getLines(ctx, text, maxWidth) {
	var words = text.split(" ");
	var lines = [];
	var currentLine = words[0];

	for (var i = 1; i < words.length; i++) {
		var word = words[i];
		var width = ctx.measureText(currentLine + " " + word).width;
		if (width < maxWidth) {
			currentLine += " " + word;
		} else {
			lines.push(currentLine);
			currentLine = word;
		}
	}
	lines.push(currentLine);
	return lines;
}

function drawMap(ctx, x, y, map, posX, posY) {
	let boxSize = 60; // taille d'une case en pixels
	let iconSize = boxSize - 10;
	ctx.font = iconSize + "px serif";
	let icon = "";
	for (let i = 0; i < map.length; ++i) {
		for (let j = 0; j < map[i].length; ++j) {
			switch (map[i][j]) {
				case "Foret":
					ctx.fillStyle = "green";
					icon = "🌲";
					break;
				case "Montagne":
					ctx.fillStyle = "grey";
					icon = "🗻";
					break;
				case "Volcan":
					ctx.fillStyle = "DarkRed";
					icon = "🌋";
					break;
				case "Plage":
					ctx.fillStyle = "yellow";
					icon = "🏖️";
					break;
				case "Village":
					ctx.fillStyle = "purple";
					icon = "🛖";
					break;
				default:
			}
			let xPos = x + boxSize * j;
			let yPos = y + boxSize * i;
			ctx.fillRect(xPos, yPos, boxSize, boxSize);
			if (i == posY && j == posX) {
				icon = "📍";
				let width = 4;
				ctx.strokeStyle = "Fuchsia";
				ctx.lineWidth = width;
				ctx.strokeRect(xPos + width / 2, yPos + width / 2, boxSize - width, boxSize - width);
			}
			ctx.fillText(icon, xPos - iconSize / 8 + 2, yPos + iconSize - 3)
		}
	}
}


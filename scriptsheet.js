// Creates global variables to be called to and overwritten
var coordinates=[];
var image;
var isDragging;
var loaded;
var mirror;
var outline;
var reader;
var selection;
var swizzle=0;
var xAxisLocked;
var yAxisLocked;
var xCoordinate;
var yCoordinate;

// Runs on page load, creates the initial canvas and sets event listeners
function initialize(){
	var canvas=document.getElementById(`canvas`);
	canvas.addEventListener(`mousedown`,onMouseDown);
	canvas.addEventListener(`mousemove`,onMouseMove);
	document.body.addEventListener(`mouseup`,onMouseUp);
};

// Hardpoints selection
function contractHardpoints(){
	selection=``;
	// Reset hardpoint selection
	document.getElementById(`engines`).classList.remove(`availableDark`);
	document.getElementById(`engines`).setAttribute(`onclick`,`contractHardpoints(),expandEngines()`);
	document.getElementById(`weapons`).classList.remove(`availableDark`);
	document.getElementById(`weapons`).setAttribute(`onclick`,`contractHardpoints(),expandWeapons()`);
	document.getElementById(`bays`).classList.remove(`availableDark`);
	document.getElementById(`bays`).setAttribute(`onclick`,`contractHardpoints(),expandBays()`);
	// Hide engines
	document.getElementById(`engine`).classList.add(`fade`);
	document.getElementById(`reverseEngine`).classList.add(`fade`);
	document.getElementById(`steeringEngine`).classList.add(`fade`);
	// Hide weapons
	document.getElementById(`gun`).classList.add(`fade`);
	document.getElementById(`turret`).classList.add(`fade`);
	// Hide bays
	document.getElementById(`fighter`).classList.add(`fade`);
	document.getElementById(`drone`).classList.add(`fade`);
};function expandEngines(){
	selection=`engines`;
	// Filter hardpoint selection
	document.getElementById(`engines`).setAttribute(`onclick`,`contractHardpoints()`);
	document.getElementById(`weapons`).classList.add(`availableDark`);
	document.getElementById(`bays`).classList.add(`availableDark`);
	// Show engines
	document.getElementById(`engine`).classList.remove(`fade`);
	document.getElementById(`reverseEngine`).classList.remove(`fade`);
	document.getElementById(`steeringEngine`).classList.remove(`fade`);
	document.getElementById(`engine`).classList.remove(`hidden`);
	document.getElementById(`reverseEngine`).classList.remove(`hidden`);
	document.getElementById(`steeringEngine`).classList.remove(`hidden`);
};function expandWeapons(){
	selection=`weapons`;
	// Filter hardpoint selection
	document.getElementById(`engines`).classList.add(`availableDark`);
	document.getElementById(`weapons`).setAttribute(`onclick`,`contractHardpoints()`);
	document.getElementById(`bays`).classList.add(`availableDark`);
	// Show weapons
	document.getElementById(`gun`).classList.remove(`fade`);
	document.getElementById(`turret`).classList.remove(`fade`);
	document.getElementById(`gun`).classList.remove(`hidden`);
	document.getElementById(`turret`).classList.remove(`hidden`);
};function expandBays(){
	selection=`bays`;
	// Filter hardpoint selection
	document.getElementById(`engines`).classList.add(`availableDark`);
	document.getElementById(`weapons`).classList.add(`availableDark`);
	document.getElementById(`bays`).setAttribute(`onclick`,`contractHardpoints()`);
	// Show bays
	document.getElementById(`fighter`).classList.remove(`fade`);
	document.getElementById(`drone`).classList.remove(`fade`);
	document.getElementById(`fighter`).classList.remove(`hidden`);
	document.getElementById(`drone`).classList.remove(`hidden`);
};

// Runs on adding a hardpoint to the active image, detects pressed hardpoint and writes it to output with positions
function addPoint(name){
	var newName=name;
	for(i=0;i<name.length;i++){
		if(name[i]==name[i].toUpperCase()){
			var newName=`"`;
			for(j=0;j<i;j++){
				newName+=name[j];
			};
			newName+=` `+name[i].toLowerCase();
			for(j=i+1;j<name.length;j++){
				newName+=name[j];
			};
			newName+=`"`;
		};
	};
	if(mirror){
		if(selection==`engines`){
			if(newName==`engine`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 0\n\t\tunder`);
			}else if(newName==`"reverse engine"`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 180\n\t\tunder`);
			}else if(newName==`"steering engine"`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 0\n\t\tunder\n\t\tleft`);
			};
		}else if(selection==`weapons`){
			coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}else if(selection==`bays`){
			coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		};
		if(Math.round(xCoordinate)!=0){
			if(selection==`engines`){
				if(newName==`engine`){
					coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 0\n\t\tunder`);
				}else if(newName==`"reverse engine"`){
					coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 180\n\t\tunder`);
				}else if(newName==`"steering engine"`){
					coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 0\n\t\tunder\n\t\tleft`);
				};
			}else if(selection==`weapons`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
			}else if(selection==`bays`){
				coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
			};
		};
	}else{
		if(selection==`engines`){
			if(newName==`engine`){
				coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 0\n\t\tunder`);
			}else if(newName==`"reverse engine"`){
				coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 180\n\t\tunder`);
			}else if(newName==`"steering engine"`){
				coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tangle 0\n\t\tunder\n\t\tleft`);
			};
		}else if(selection==`weapons`){
			coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}else if(selection==`bays`){
			coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		};
	};
	document.getElementById(`points`).innerHTML=coordinates.join(`<br>`);
	document.getElementById(`undo`).classList.remove(`unavailable`);
	document.getElementById(`undo`).classList.add(`highlight`);
};

// Removes the latest entry from the hardpoint output
function undoPoint(){
	coordinates.pop();
	document.getElementById(`points`).innerHTML=coordinates.join(`<br>`);
	if(!coordinates[0]){
		document.getElementById(`undo`).classList.remove(`highlight`);
		document.getElementById(`undo`).classList.add(`unavailable`);
	};
};

// Runs on selecting the swizzles option, each press iterates through each swizzle option
function changeSwizzle(){
	if(swizzle<6){
		swizzle++;
	}else{
		swizzle=0;
	};
	drawImage();
};

// Locks or unlocks the manipulation of coordinates along certain axis
function lockXAxis(){
	if(xAxisLocked){
		document.getElementById(`xCoordinate`).style=`text-decoration:none;`;
		xAxisLocked=false;
		drawImage();
	}else{
		document.getElementById(`xCoordinate`).style=`text-decoration:underline overline;`;
		document.getElementById(`yCoordinate`).style=`text-decoration:none;`;
		yAxisLocked=false;
		xAxisLocked=true;
		drawImage();
	};
};function lockYAxis(){
	if(yAxisLocked){
		document.getElementById(`yCoordinate`).style=`text-decoration:none;`;
		yAxisLocked=false;
		drawImage();
	}else{
		document.getElementById(`xCoordinate`).style=`text-decoration:none;`;
		document.getElementById(`yCoordinate`).style=`text-decoration:underline overline;`;
		xAxisLocked=false;
		yAxisLocked=true;
		drawImage();
	};
};

// Controls the selection reticle and writes to coordinates when dragging
function onMouseMove(event){
	if(!isDragging){
		return;
	};
	drawCoordinates(event.offsetX,event.offsetY);
};function onMouseDown(event){
	isDragging=true;
	drawCoordinates(event.offsetX,event.offsetY);
};function onMouseUp(event){
	isDragging=false;
};

// Controls the actions for WASD and arrow keys, moves relevant position marginally per press or dependant on how long they are held
function control(event){
	if(loaded){
		if(!xAxisLocked){
			if(event.keyCode==37||event.keyCode==65){
				if(Math.abs(image.width/4)*-1<xCoordinate){
					xCoordinate-=.5/(inflation*scale);
				};
			};
			if(event.keyCode==39||event.keyCode==68){
				if(image.width/4>xCoordinate){
					xCoordinate+=.5/(inflation*scale);
				};
			};
		};
		if(!yAxisLocked){
			if(event.keyCode==38||event.keyCode==87){
				if(Math.abs(image.height/4)*-1<yCoordinate){
					yCoordinate-=.5/(inflation*scale);
				};
			};
			if(event.keyCode==40||event.keyCode==83){
				if((image.height/4)>yCoordinate){
					yCoordinate+=.5/(inflation*scale);
				};
			};
		};
		drawImage();
	};
};function drawCoordinates(x,y){
	if(xAxisLocked){
		yCoordinate=.5*(y-.5*canvas.height);
	}else if(yAxisLocked){
		xCoordinate=.5*(x-.5*canvas.width);
	}else{
		yCoordinate=.5*(y-.5*canvas.height);
		xCoordinate=.5*(x-.5*canvas.width);
	};
	drawImage();
};

// Runs on uploading image to the site, loads uploaded image into ship viewer
function loadImage(){
	var unavailable=document.getElementsByClassName(`unavailable`);
	while(unavailable.length){
		unavailable[0].classList.add(`available`);
		unavailable[0].classList.remove(`unavailable`);
	};
	if(typeof window.FileReader!==`function`){
		return;
	};
	var input=document.getElementById(`file`);
	if(!input||!input.files||!input.files[0]){
		return;
	};
	reader=new FileReader();
	reader.onload=createImage;
	var file=input.files[0];
	reader.readAsDataURL(file);
	if(file.name.lastIndexOf(`@2x`)==file.name.lastIndexOf(`.`)-3){
		scale=1;
	}else{
		scale=2;
	};
};function createImage(){
	image=new Image();
	image.onload=imageLoaded;
	image.src=reader.result;
};function imageLoaded(){
	var canvas=document.getElementById(`canvas`);
	inflation=image.height/750;
	image.width=(image.width/image.height)*750;
	image.height=750;
	canvas.height=image.height;
	canvas.width=image.width;
	xCoordinate=0;
	yCoordinate=0;
	drawImage();
	coordinates=[];
	document.getElementById(`points`).innerHTML=coordinates.join(`<br>`);
};

// Runs on refreshing of canvas, is called on any change to the position of the reticle or any option which alters or draws over the ship image
function drawImage(){
	loaded=true;
	var canvas=document.getElementById(`canvas`);
	var context=canvas.getContext(`2d`);
	context.clearRect(0,0,canvas.width,canvas.height);
	if(image){
		context.drawImage(image,0,0,canvas.width,canvas.height);
	};
	document.getElementById(`swizzle`).innerHTML=`Swizzle `+swizzle;
	var SWIZZLE=[
		[0,1,2],
		[0,2,1],
		[1,0,2],
		[2,0,1],
		[1,2,0],
		[2,1,0],
		[1,2,2]
	];
	var imageData=context.getImageData(0,0,canvas.width,canvas.height);
	var pixels=imageData.data;
	for(var i=0;i<pixels.length;i+=4){
		var red=pixels[i+SWIZZLE[swizzle][0]];
		var green=pixels[i+SWIZZLE[swizzle][1]];
		var blue=pixels[i+SWIZZLE[swizzle][2]];
		pixels[i+0]=red;
		pixels[i+1]=green;
		pixels[i+2]=blue;
	};
	if(outline){
		document.getElementById(`outline`).innerHTML=`Outline Shown`;
		var i=0;
		for(var i=0;i<pixels.length&&!pixels[i+3];i+=4){};
		var start=i;
		var DIR=[
			pixels.length-4*canvas.width,
			pixels.length-4*canvas.width+4,
			4,
			4*canvas.width+4,
			4*canvas.width,
			4*canvas.width-4,
			pixels.length-4,
			pixels.length-4*canvas.width-4
		];
		var d=0;
		do{
			pixels[i+0]=255;
			pixels[i+1]=0;
			pixels[i+2]=0;
			pixels[i+3]=255;
			while(!pixels[(i+3+DIR[d])%pixels.length]){d=(d+1)%8;}
			i=(i+DIR[d])%pixels.length;
			d=(d+6)%8;
		}while(i!=start);
	}else{
		document.getElementById(`outline`).innerHTML=`Outline Hidden`;
	};
	context.putImageData(imageData,0,0);
	if(isNaN(xCoordinate)||isNaN(yCoordinate)){
		return;
	};
	var x=xCoordinate*2+.5*canvas.width;
	var y=yCoordinate*2+.5*canvas.height;
	context.beginPath();
	context.arc(x,y,5,0,2*Math.PI,false);
	context.setLineDash([]);
	context.lineWidth=1.5;
	context.strokeStyle=`#F00`;
	context.stroke();
	if(xAxisLocked){
		context.beginPath();
		context.setLineDash([15,10]);
		context.moveTo(x,y-20);
		context.lineTo(x,y+20);
		context.lineWidth=1.5;
		context.stroke();
	}else if(yAxisLocked){
		context.beginPath();
		context.setLineDash([15,10]);
		context.moveTo(x-20,y);
		context.lineTo(x+20,y);
		context.lineWidth=1.5;
		context.stroke();
	};
	if(mirror){
		var rx=canvas.width-x;
		context.beginPath();
		context.arc(rx,y,5,0,2*Math.PI,false);
		context.setLineDash([]);
		context.stroke();
		if(xAxisLocked){
			context.beginPath();
			context.setLineDash([15,10]);
			context.moveTo(rx,y-20);
			context.lineTo(rx,y+20);
			context.lineWidth=1.5;
			context.stroke();
		}else if(yAxisLocked){
			context.beginPath();
			context.setLineDash([15,10]);
			context.moveTo(rx-20,y);
			context.lineTo(rx+20,y);
			context.lineWidth=1.5;
			context.stroke();
		};
		context.beginPath();
		context.setLineDash([20,10]);
		context.moveTo(canvas.width/2,0);
		context.lineTo(canvas.width/2,canvas.height);
		context.lineWidth=1.5;
		context.stroke();
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+` (`+Math.round(((xCoordinate*(inflation*scale))*-1)*2)/2+`)&nbsp;`;
	}else{
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+`&nbsp;`;
	};
	document.getElementById(`yCoordinate`).innerHTML=`&nbsp;Y: `+Math.round((yCoordinate*(inflation*scale))*2)/2+`&nbsp;`;
};

// Image overlay tools which help with hardpoint positioning/troubleshooting
function toggleMirror(){
	if(!mirror){
		mirror=1;
		document.getElementById(`mirror`).innerHTML=`Mirror On`;
	}else{
		mirror=0;
		document.getElementById(`mirror`).innerHTML=`Mirror Off`;
	};
	drawImage();
};function toggleOutline(){
	if(!outline){
		outline=1;
	}else{
		outline=0;
	};
	drawImage();
};function copyPoints(){
	navigator.clipboard.writeText(coordinates.join(`\n`));
};
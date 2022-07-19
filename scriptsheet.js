//	Page load
	var canvas=document.getElementById(`canvas`);
	var canvasContext=canvas.getContext(`2d`);
function initialize(){
	canvas.addEventListener(`mousedown`,onMouseDown);
	canvas.addEventListener(`mousemove`,onMouseMove);
	document.body.addEventListener(`mouseup`,onMouseUp);
	};
//	Processing
function loadImage(){
	document.getElementById(`bays`).classList.remove(`hidden`);
	document.getElementById(`engines`).classList.remove(`hidden`);
	document.getElementById(`mirror`).classList.remove(`hidden`);
	document.getElementById(`outline`).classList.remove(`hidden`);
	document.getElementById(`points`).classList.remove(`hidden`);
	document.getElementById(`swizzle`).classList.remove(`hidden`);
	document.getElementById(`undo`).classList.remove(`hidden`);
	document.getElementById(`weapons`).classList.remove(`hidden`);
	document.getElementById(`xCoordinate`).classList.remove(`hidden`);
	document.getElementById(`yCoordinate`).classList.remove(`hidden`);
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
	};
function createImage(){
	image=new Image();
	image.onload=imageLoaded;
	image.src=reader.result;
	};
function imageLoaded(){
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
//	Execution
function drawImage(){
	loaded=true;
	canvasContext.clearRect(0,0,canvas.width,canvas.height);
	if(image){
		canvasContext.drawImage(image,0,0,canvas.width,canvas.height);
	};
	imageData=canvasContext.getImageData(0,0,canvas.width,canvas.height);
	pixels=imageData.data;
	swizzleImage();
	outlineImage();
	canvasContext.putImageData(imageData,0,0);
	drawCursor();
	};
function swizzleImage(){
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
	for(var i=0;i<pixels.length;i+=4){
		var red=pixels[i+SWIZZLE[swizzle][0]];
		var green=pixels[i+SWIZZLE[swizzle][1]];
		var blue=pixels[i+SWIZZLE[swizzle][2]];
		pixels[i+0]=red;
		pixels[i+1]=green;
		pixels[i+2]=blue;
	};
	};
function outlineImage(){
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
	};
function drawCursor(){
	var x=xCoordinate*2+.5*canvas.width;
	var y=yCoordinate*2+.5*canvas.height;
	drawArc(x,y,5,0,2*Math.PI,`#f00`);
	if(xAxisLocked){
		drawLine(x-20,y,x+20,y,[15,10],1.5,`#f00`);
	}else if(yAxisLocked){
		drawLine(x,y-20,x,y+20,[15,10],1.5,`#f00`);
	};
	if(mirror){
		var rx=canvas.width-x;
		drawArc(rx,y,5,0,2*Math.PI,`#f00`);
		if(xAxisLocked){
			drawLine(rx-20,y,rx+20,y,[15,10],1.5,`#f00`);
		}else if(yAxisLocked){
			drawLine(rx,y-20,rx,y+20,[15,10],1.5,`#f00`);
		};
		drawLine(canvas.width/2,0,canvas.width/2,canvas.height,[20,10],1.5,`#f00`);
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+` (`+Math.round(((xCoordinate*(inflation*scale))*-1)*2)/2+`)&nbsp;`;
	}else{
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+`&nbsp;`;
	};
	document.getElementById(`yCoordinate`).innerHTML=`&nbsp;Y: `+Math.round((yCoordinate*(inflation*scale))*2)/2+`&nbsp;`;
	};
//	Preferences
	var swizzle=0;
	var outline;
	var mirror;
	var xAxisLocked;
	var yAxisLocked;
function changeSwizzle(){
	if(swizzle<6){
		swizzle++;
	}else{
		swizzle=0;
	};
	drawImage();
	};
function toggleOutline(){
	if(!outline){
		outline=1;
	}else{
		outline=0;
	};
	drawImage();
	};
function toggleMirror(){
	if(!mirror){
		mirror=1;
		document.getElementById(`mirror`).innerHTML=`Mirror On`;
	}else{
		mirror=0;
		document.getElementById(`mirror`).innerHTML=`Mirror Off`;
	};
	drawImage();
	};
function lockXAxis(){
	if(xAxisLocked){
		document.getElementById(`yCoordinate`).style=`text-decoration:none;`;
		xAxisLocked=false;
		drawImage();
	}else{
		document.getElementById(`xCoordinate`).style=`text-decoration:none;`;
		document.getElementById(`yCoordinate`).style=`text-decoration:line-through;`;
		yAxisLocked=false;
		xAxisLocked=true;
		drawImage();
	};
	};
function lockYAxis(){
	if(yAxisLocked){
		document.getElementById(`xCoordinate`).style=`text-decoration:none;`;
		yAxisLocked=false;
		drawImage();
	}else{
		document.getElementById(`xCoordinate`).style=`text-decoration:line-through;`;
		document.getElementById(`yCoordinate`).style=`text-decoration:none;`;
		xAxisLocked=false;
		yAxisLocked=true;
		drawImage();
	};
	};
//	Mouse events
function onMouseMove(event){
	if(!isDragging){
		return;
	};
	drawCoordinates(event.offsetX,event.offsetY);
	};
function onMouseDown(event){
	isDragging=true;
	drawCoordinates(event.offsetX,event.offsetY);
	};
function onMouseUp(event){
	isDragging=false;
	};
function drawCoordinates(x,y){
	if(xAxisLocked){
		xCoordinate=.5*(x-.5*canvas.width);
	}else if(yAxisLocked){
		yCoordinate=.5*(y-.5*canvas.height);
	}else{
		xCoordinate=.5*(x-.5*canvas.width);
		yCoordinate=.5*(y-.5*canvas.height);
	};
	drawImage();
	};
//	Hardpoint selection
function contractHardpoints(){
	selection=``;
	document.getElementById(`engines`).setAttribute(`onclick`,`contractHardpoints(),expandEngines()`);
	document.getElementById(`weapons`).setAttribute(`onclick`,`contractHardpoints(),expandWeapons()`);
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
	};
function expandEngines(){
	selection=`engines`;
	document.getElementById(`engines`).setAttribute(`onclick`,`contractHardpoints()`);
	// Show engines
	document.getElementById(`engine`).classList.remove(`fade`);
	document.getElementById(`engine`).classList.remove(`hidden`);
	document.getElementById(`reverseEngine`).classList.remove(`fade`);
	document.getElementById(`reverseEngine`).classList.remove(`hidden`);
	document.getElementById(`steeringEngine`).classList.remove(`fade`);
	document.getElementById(`steeringEngine`).classList.remove(`hidden`);
	};
function expandWeapons(){
	selection=`weapons`;
	document.getElementById(`weapons`).setAttribute(`onclick`,`contractHardpoints()`);
	// Show weapons
	document.getElementById(`gun`).classList.remove(`fade`);
	document.getElementById(`gun`).classList.remove(`hidden`);
	document.getElementById(`turret`).classList.remove(`fade`);
	document.getElementById(`turret`).classList.remove(`hidden`);
	};
function expandBays(){
	selection=`bays`;
	document.getElementById(`bays`).setAttribute(`onclick`,`contractHardpoints()`);
	// Show bays
	document.getElementById(`drone`).classList.remove(`fade`);
	document.getElementById(`drone`).classList.remove(`hidden`);
	document.getElementById(`fighter`).classList.remove(`fade`);
	document.getElementById(`fighter`).classList.remove(`hidden`);
	};
//	Hardpoint operations
	var coordinates=[];
function addPoint(name){
	newName=name;
	for(i=0;i<name.length;i++){
		if(name[i]==name[i].toUpperCase()){
			newName=``;
			for(j=0;j<i;j++){
				newName+=name[j];
			};
			newName+=` `+name[i].toLowerCase();
			for(j=i+1;j<name.length;j++){
				newName+=name[j];
			};
		};
		if(selection==`bays`&&i==0){
			newName=name[i].toUpperCase();
			for(j=i+1;j<name.length;j++){
				newName+=name[j];
			};
		};
	};
	if(mirror){
		if(selection==`engines`){
			if(newName==`engine`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`reverse engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`steering engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder\n\t\tleft`);
			};
		}else if(selection==`weapons`){
			coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}else if(selection==`bays`){
			coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		};
		if(Math.round(xCoordinate)!=0){
			if(selection==`engines`){
				if(newName==`engine`){
					coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
				}else if(newName==`reverse engine`){
					coordinates.push(`\t`+`"`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
				}else if(newName==`steering engine`){
					coordinates.push(`\t`+`"`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder\n\t\tleft`);
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
				coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`reverse engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`steering engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder\n\t\tleft`);
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
function undoPoint(){
	coordinates.pop();
	document.getElementById(`points`).innerHTML=coordinates.join(`<br>`);
	if(!coordinates[0]){
		document.getElementById(`undo`).classList.remove(`highlight`);
		document.getElementById(`undo`).classList.add(`unavailable`);
	};
	};
function copyPoints(){
	navigator.clipboard.writeText(coordinates.join(`\n`));
	};
//	Canvas operations
function drawArc(x,y,radius,start,end,colour){
	canvasContext.beginPath();
	canvasContext.arc(x,y,radius,start,end);
	canvasContext.setLineDash([]);
	canvasContext.lineWidth=1.5;
	canvasContext.strokeStyle=colour;
	canvasContext.stroke();
	};
function drawLine(startX,startY,endX,endY,lineDash,width,colour){
	canvasContext.beginPath();
	canvasContext.moveTo(startX,startY);
	canvasContext.lineTo(endX,endY);
	canvasContext.setLineDash(lineDash);
	canvasContext.lineWidth=width;
	canvasContext.strokeStyle=colour;
	canvasContext.stroke();
	};
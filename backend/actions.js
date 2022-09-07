var hardpointType=`gun`;
var hardpoints=[];
var swizzle=0;
var outline;
var mirror;
var xAxisLocked;
var yAxisLocked;
function addHardpoint(type){
	switch(type){
		case `gun`:
			hardpoints.push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			if(mirror){
				hardpoints.push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			}
			break
		case `turret`:
			hardpoints.push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			if(mirror){
				hardpoints.push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			}
			break
		case `engine`:
			hardpoints.push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			if(mirror){
				hardpoints.push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			}
			break
		case `left`:
			hardpoints.push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			hardpoints.push([`\t\tangle 90`]);
			hardpoints.push([`\t\tleft`]);
			break
		case `right`:
			hardpoints.push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			hardpoints.push([`\t\tangle 270`]);
			hardpoints.push([`\t\tright`]);
			break
		case `reverse`:
			hardpoints.push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			if(mirror){
				hardpoints.push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2]);
			}
			break
	}
	document.getElementById(`hardpoints`).innerHTML=hardpoints.map(e=>e.join(` `)).join(`\n`);
}
function copyPoints(){
	navigator.clipboard.writeText(hardpoints.map(e=>e.join(` `)).join(`\n`));
}
function changeSwizzle(){
	if(swizzle<6){
		swizzle++;
	}else{
		swizzle=0;
	}
	drawImage();
}
function toggleOutline(){
	if(!outline){
		outline=1;
		document.getElementById(`outline`).innerHTML=`Outline Shown`;
	}else{
		outline=0;
		document.getElementById(`outline`).innerHTML=`Outline Hidden`;
	}
	drawImage();
}
function toggleMirror(){
	if(!mirror){
		mirror=1;
		document.getElementById(`mirror`).innerHTML=`Mirror On`;
	}else{
		mirror=0;
		document.getElementById(`mirror`).innerHTML=`Mirror Off`;
	}
	drawImage();
}
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
	}
}
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
	}
}

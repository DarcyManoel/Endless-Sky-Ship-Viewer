var coordinates=[];
var swizzle=0;
var outline;
var mirror;
var xAxisLocked;
var yAxisLocked;
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
}
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
}
function expandWeapons(){
	selection=`weapons`;
	document.getElementById(`weapons`).setAttribute(`onclick`,`contractHardpoints()`);
	// Show weapons
	document.getElementById(`gun`).classList.remove(`fade`);
	document.getElementById(`gun`).classList.remove(`hidden`);
	document.getElementById(`turret`).classList.remove(`fade`);
	document.getElementById(`turret`).classList.remove(`hidden`);
}
function expandBays(){
	selection=`bays`;
	document.getElementById(`bays`).setAttribute(`onclick`,`contractHardpoints()`);
	// Show bays
	document.getElementById(`drone`).classList.remove(`fade`);
	document.getElementById(`drone`).classList.remove(`hidden`);
	document.getElementById(`fighter`).classList.remove(`fade`);
	document.getElementById(`fighter`).classList.remove(`hidden`);
}
function addPoint(name){
	newName=name;
	for(i=0;i<name.length;i++){
		if(name[i]==name[i].toUpperCase()){
			newName=``;
			for(j=0;j<i;j++){
				newName+=name[j];
			}
			newName+=` `+name[i].toLowerCase();
			for(j=i+1;j<name.length;j++){
				newName+=name[j];
			}
		}
		if(selection==`bays`&&i==0){
			newName=name[i].toUpperCase();
			for(j=i+1;j<name.length;j++){
				newName+=name[j];
			}
		}
	}
	if(mirror){
		if(selection==`engines`){
			if(newName==`engine`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`reverse engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`steering engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder\n\t\tleft`);
			}
		}else if(selection==`weapons`){
			coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}else if(selection==`bays`){
			coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}
		if(Math.round(xCoordinate)!=0){
			if(selection==`engines`){
				if(newName==`engine`){
					coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
				}else if(newName==`reverse engine`){
					coordinates.push(`\t`+`"`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
				}else if(newName==`steering engine`){
					coordinates.push(`\t`+`"`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)*-1+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder\n\t\tleft`);
				}
			}else if(selection==`weapons`){
				coordinates.push(`\t`+newName+` `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
			}else if(selection==`bays`){
				coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.abs(Math.round((xCoordinate*(inflation*scale))*2)/2)+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
			}
		}
	}else{
		if(selection==`engines`){
			if(newName==`engine`){
				coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`reverse engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder`);
			}else if(newName==`steering engine`){
				coordinates.push(`\t`+`"`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tzoom 1\n\t\tunder\n\t\tleft`);
			}
		}else if(selection==`weapons`){
			coordinates.push(`\t`+newName+` `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}else if(selection==`bays`){
			coordinates.push(`\t`+`bay`+` "`+newName+`" `+Math.round((xCoordinate*(inflation*scale))*2)/2+` `+Math.round((yCoordinate*(inflation*scale))*2)/2);
		}
	}
	document.getElementById(`points`).innerHTML=coordinates.join(`<br>`);
	document.getElementById(`undo`).classList.remove(`unavailable`);
	document.getElementById(`undo`).classList.add(`highlight`);
}
function undoPoint(){
	coordinates.pop();
	document.getElementById(`points`).innerHTML=coordinates.join(`<br>`);
	if(!coordinates[0]){
		document.getElementById(`undo`).classList.remove(`highlight`);
		document.getElementById(`undo`).classList.add(`unavailable`);
	}
}
function copyPoints(){
	navigator.clipboard.writeText(coordinates.join(`\n`));
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

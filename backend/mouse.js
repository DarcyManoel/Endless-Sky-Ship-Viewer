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

var isDragging=false
//	Fine coordinate control using arrow keys or WASD
function control(event){
	switch(event.keyCode){
		case 37:
		case 65:
			if(!yAxisLocked){
				xCoordinate-=.5/(inflation*scale)
			}
			break
		case 38:
		case 87:
			if(!xAxisLocked){
				yCoordinate-=.5/(inflation*scale)
			}
			break
		case 39:
		case 68:
			if(!yAxisLocked){
				xCoordinate+=.5/(inflation*scale)
			}
			break
		case 40:
		case 83:
			if(!xAxisLocked){
				yCoordinate+=.5/(inflation*scale)
			}
			break
	}
	drawImage()
}
function onMouseMove(event){
	if(isDragging){
		drawCoordinates(event.offsetX,event.offsetY)
	}
}
function onMouseDown(event){
	isDragging=true
	drawCoordinates(event.offsetX,event.offsetY)
}
function onMouseUp(event){
	isDragging=false
}
function drawCoordinates(x,y){
	if(!xAxisLocked&&!yAxisLocked){
		xCoordinate=.5*(x-.5*canvas.width)
		yCoordinate=.5*(y-.5*canvas.height)
	}
	if(xAxisLocked){
		xCoordinate=.5*(x-.5*canvas.width)
	}else if(yAxisLocked){
		yCoordinate=.5*(y-.5*canvas.height)
	}
	drawImage()
}

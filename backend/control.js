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
	switch(isDragging){
		case 0:
			return
			break
	}
	drawCoordinates(event.offsetX,event.offsetY)
}
function onMouseDown(event){
	isDragging=1
	drawCoordinates(event.offsetX,event.offsetY)
}
function onMouseUp(event){
	isDragging=0
}
function drawCoordinates(x,y){
	if(!xAxisLocked&&!yAxisLocked){
		xCoordinate=.5*(x-.5*canvas.width)
		yCoordinate=.5*(y-.5*canvas.height)
	}
	switch(xAxisLocked){
		case 1:
			xCoordinate=.5*(x-.5*canvas.width)
			break
	}
	switch(yAxisLocked){
		case 1:
			yCoordinate=.5*(y-.5*canvas.height)
			break
	}
	drawImage()
}

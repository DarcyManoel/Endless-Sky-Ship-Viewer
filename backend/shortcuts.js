function drawArc(x,y,radius,start,end,colour){
	canvasContext.beginPath();
	canvasContext.arc(x,y,radius,start,end);
	canvasContext.setLineDash([]);
	canvasContext.lineWidth=1.5;
	canvasContext.strokeStyle=colour;
	canvasContext.stroke();
}
function drawLine(startX,startY,endX,endY,lineDash,width,colour){
	canvasContext.beginPath();
	canvasContext.moveTo(startX,startY);
	canvasContext.lineTo(endX,endY);
	canvasContext.setLineDash(lineDash);
	canvasContext.lineWidth=width;
	canvasContext.strokeStyle=colour;
	canvasContext.stroke();
}

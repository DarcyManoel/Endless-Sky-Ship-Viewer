var canvas=document.getElementById(`canvas`)
var canvasContext=canvas.getContext(`2d`)
function initialize(){
	canvas.addEventListener(`mousedown`,onMouseDown)
	canvas.addEventListener(`mousemove`,onMouseMove)
	document.body.addEventListener(`mouseup`,onMouseUp)
}

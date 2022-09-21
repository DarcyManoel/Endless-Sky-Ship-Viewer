var canvas=document.getElementById(`canvas`)
var canvasContext=canvas.getContext(`2d`)
function initialize(){
	if(localStorage.getItem(`help`)==`true`){
		document.getElementById(`help`).innerHTML=`Don't Help Me!`
		document.getElementById(`helpUpload`).classList.remove(`hidden`)
		document.getElementById(`helpSwizzle`).classList.remove(`hidden`)
		document.getElementById(`helpOutline`).classList.remove(`hidden`)
		document.getElementById(`helpMirror`).classList.remove(`hidden`)
		document.getElementById(`helpHardpoints`).classList.remove(`hidden`)
		help=true
	}
	canvas.addEventListener(`mousedown`,onMouseDown)
	canvas.addEventListener(`mousemove`,onMouseMove)
	document.body.addEventListener(`mouseup`,onMouseUp)
}

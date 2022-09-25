var canvas=document.getElementById(`canvas`)
var canvasContext=canvas.getContext(`2d`)
function initialize(){
	if(localStorage.getItem(`help`)==`true`){
		document.getElementById(`helpToggle`).innerHTML=`Don't Help Me!`
		document.getElementById(`help`).classList.remove(`hidden`)
		document.getElementById(`swizzle`).style=`border-right:1px solid #fff`
		document.getElementById(`outline`).style=`border-right:1px solid #fff`
		document.getElementById(`mirror`).style=`border-right:1px solid #fff`
		document.getElementById(`hardpoints`).style=`border-right:1px solid #fff`
		help=true
	}
	canvas.addEventListener(`mousedown`,onMouseDown)
	canvas.addEventListener(`mousemove`,onMouseMove)
	document.body.addEventListener(`mouseup`,onMouseUp)
}

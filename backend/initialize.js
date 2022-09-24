var canvas=document.getElementById(`canvas`)
var canvasContext=canvas.getContext(`2d`)
function initialize(){
	if(localStorage.getItem(`help`)==`true`){
		document.getElementById(`help`).innerHTML=`Don't Help Me!`
		document.getElementById(`helpUpload`).classList.remove(`hidden`)
		document.getElementById(`helpSwizzle`).classList.remove(`hidden`)
		document.getElementById(`swizzle`).style=`border-right:1px solid #fff`
		document.getElementById(`helpOutline`).classList.remove(`hidden`)
		document.getElementById(`outline`).style=`border-right:1px solid #fff`
		document.getElementById(`helpMirror`).classList.remove(`hidden`)
		document.getElementById(`mirror`).style=`border-right:1px solid #fff`
		document.getElementById(`helpHardpoints`).classList.remove(`hidden`)
		document.getElementById(`addHardpoints`).style=`border-right:1px solid #fff`
		help=true
	}
	canvas.addEventListener(`mousedown`,onMouseDown)
	canvas.addEventListener(`mousemove`,onMouseMove)
	document.body.addEventListener(`mouseup`,onMouseUp)
}

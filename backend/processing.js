function loadImage(){
	document.getElementById(`swizzle`).classList.remove(`blocked`)
	document.getElementById(`outline`).classList.remove(`blocked`)
	document.getElementById(`mirror`).classList.remove(`blocked`)
	document.getElementById(`addHardpoints`).classList.remove(`blocked`)
	document.getElementById(`xCoordinate`).classList.remove(`blocked`)
	document.getElementById(`yCoordinate`).classList.remove(`blocked`)
	document.getElementById(`helpUpload`).classList.add(`blocked`)
	document.getElementById(`helpSwizzle`).classList.add(`blocked`)
	document.getElementById(`helpOutline`).classList.add(`blocked`)
	document.getElementById(`helpMirror`).classList.add(`blocked`)
	document.getElementById(`helpHardpoints`).classList.add(`blocked`)
	if(typeof window.FileReader!==`function`){
		return
	}
	var input=document.getElementById(`file`)
	if(!input||!input.files||!input.files[0]){
		return
	}
	reader=new FileReader()
	reader.onload=createImage
	var file=input.files[0]
	reader.readAsDataURL(file)
	if(file.name.lastIndexOf(`@2x`)==file.name.lastIndexOf(`.`)-3){
		scale=1
	}else{
		scale=2
	}
}
function createImage(){
	image=new Image()
	image.onload=imageLoaded
	image.src=reader.result
}
function imageLoaded(){
	var canvas=document.getElementById(`canvas`)
	inflation=image.height/700
	image.width=(image.width/image.height)*700
	image.height=700
	canvas.height=image.height
	canvas.width=image.width
	xCoordinate=0
	yCoordinate=0
	drawImage()
}

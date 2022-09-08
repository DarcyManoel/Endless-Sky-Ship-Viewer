function loadImage(){
	document.getElementById(`swizzle`).classList.remove(`hidden`)
	document.getElementById(`outline`).classList.remove(`hidden`)
	document.getElementById(`mirror`).classList.remove(`hidden`)
	document.getElementById(`addHardpoints`).classList.remove(`hidden`)
	document.getElementById(`xCoordinate`).classList.remove(`hidden`)
	document.getElementById(`yCoordinate`).classList.remove(`hidden`)
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
	inflation=image.height/750
	image.width=(image.width/image.height)*750
	image.height=750
	canvas.height=image.height
	canvas.width=image.width
	xCoordinate=0
	yCoordinate=0
	drawImage()
}

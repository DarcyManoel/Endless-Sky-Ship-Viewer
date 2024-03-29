const canvas=document.getElementById(`canvas`)
const canvasContext=canvas.getContext(`2d`)
var swizzle=0
var isMirrored=false
var isFormatted=false
var isOutlined=false
var hardpoints=[[],[],[],[]]
var hardpointsFormatted=[[],[],[],[]]
var isDragging=false
var xAxisLocked=false
var yAxisLocked=false
function initialize(){
	if(localStorage.getItem(`isFormatted`)==`true`){
		document.getElementById(`formatting`).classList.remove(`dark`)
		isFormatted=true
	}
	if(localStorage.getItem(`isMirrored`)==`true`){
		document.getElementById(`mirror`).classList.remove(`dark`)
		isMirrored=true
	}
	if(localStorage.getItem(`isOutlined`)==`true`){
		document.getElementById(`outline`).classList.remove(`dark`)
		isOutlined=true
	}
	canvas.addEventListener(`mousedown`,onMouseDown)
	canvas.addEventListener(`mousemove`,onMouseMove)
	document.body.addEventListener(`mouseup`,onMouseUp)
}
//	Load
function uploadImage(){
	hardpoints=[[],[],[],[]]
	hardpointsFormatted=[[],[],[],[]]
	document.getElementById(`output`).innerHTML=``
	document.querySelectorAll('.blocked').forEach((element)=>{
		element.classList.remove('blocked')
	})
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
//	Interaction
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
function keyDown(event){
	if(event.keyCode==37||event.keyCode==65){			//	Left / A
		if(!yAxisLocked){
			xCoordinate-=.5/(inflation*scale)
		}
	}else if(event.keyCode==39||event.keyCode==68){		//	Right / D
		if(!yAxisLocked){
			xCoordinate+=.5/(inflation*scale)
		}
	}else if(event.keyCode==38||event.keyCode==87){		//	Up / W
		if(!xAxisLocked){
			yCoordinate-=.5/(inflation*scale)
		}
	}else if(event.keyCode==40||event.keyCode==83){		//	Down / S
		if(!xAxisLocked){
			yCoordinate+=.5/(inflation*scale)
		}
	}
	if(event.keyCode==67){								//	C
		copyHardpoints()
	}
	if(event.keyCode==70){								//	F
		toggleFormatting()
	}
	if(event.keyCode==77){								//	M
		toggleMirror()
	}
	if(event.keyCode==79){								//	O
		toggleOutline()
	}
	drawImage()
}
//	Image Manipulation
function cycleSwizzle(){
	if(swizzle==6){
		swizzle=0
	}
	else{
		swizzle++
	}
	drawImage()
}
function swizzleImage(){
	document.getElementById(`swizzle`).innerHTML=`Swizzle `+swizzle
	var SWIZZLE=[
		[0,1,2],	//	0
		[0,2,1],	//	1
		[1,0,2],	//	2
		[2,0,1],	//	3
		[1,2,0],	//	4
		[2,1,0],	//	5
		[1,2,2]		//	6
	]
	for(i1=0;i1<pixels.length;i1+=4){
		var red=pixels[i1+SWIZZLE[swizzle][0]]
		var green=pixels[i1+SWIZZLE[swizzle][1]]
		var blue=pixels[i1+SWIZZLE[swizzle][2]]
		pixels[i1+0]=red
		pixels[i1+1]=green
		pixels[i1+2]=blue
	}
}
function toggleFormatting(){
	isFormatted=!isFormatted
	localStorage.setItem(`isFormatted`,isFormatted)
	document.getElementById(`formatting`).classList.toggle(`dark`)
	printHardpoints()
}
function toggleMirror(){
	isMirrored=!isMirrored
	localStorage.setItem(`isMirrored`,isMirrored)
	document.getElementById(`mirror`).classList.toggle(`dark`)
	drawImage()
}
function toggleOutline(){
	isOutlined=!isOutlined
	localStorage.setItem(`isOutlined`,isOutlined)
	document.getElementById(`outline`).classList.toggle(`dark`)
	drawImage()
}
function outlineImage(){
	if(isOutlined){
		for(i1=0;i1<pixels.length&&!pixels[i1+3];i1+=4){}
		var start=i1
		var DIR=[
			pixels.length-4*canvas.width,
			pixels.length-4*canvas.width+4,
			4,
			4*canvas.width+4,
			4*canvas.width,
			4*canvas.width-4,
			pixels.length-4,
			pixels.length-4*canvas.width-4
		]
		var i2=0
		do{
			pixels[i1+0]=255
			pixels[i1+1]=0
			pixels[i1+2]=0
			pixels[i1+3]=255
			while(!pixels[(i1+3+DIR[i2])%pixels.length]){i2=(i2+1)%8;}
			i1=(i1+DIR[i2])%pixels.length
			i2=(i2+6)%8
		}while(i1!=start)
	}
}
//	Hardpoints
function addHardpoint(type){
	switch(type){
		case `gun`:
			hardpointsFormatted[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(isMirrored&&xCoordinate!==0){
				hardpointsFormatted[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `turret`:
			hardpointsFormatted[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(isMirrored&&xCoordinate!==0){
				hardpointsFormatted[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `fighter`:
			hardpointsFormatted[2].push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(isMirrored&&xCoordinate!==0){
				hardpointsFormatted[2].push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `drone`:
			hardpointsFormatted[2].push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(isMirrored&&xCoordinate!==0){
				hardpointsFormatted[2].push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `engine`:
			hardpointsFormatted[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(isMirrored&&xCoordinate!==0){
				hardpointsFormatted[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `left`:
			hardpointsFormatted[3].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n\t\tangle 90\n\t\tleft\n`])
			hardpoints.push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n\t\tangle 90\n\t\tleft\n`])
			break
		case `right`:
			hardpointsFormatted[3].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n\t\tangle 270\n\t\tright\n`])
			hardpoints.push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n\t\tangle 270\n\t\tright\n`])
			break
		case `reverse`:
			hardpointsFormatted[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(isMirrored&&xCoordinate!==0){
				hardpointsFormatted[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
	}
	printHardpoints()
}
function printHardpoints(){
	document.getElementById(`output`).innerHTML=``
	if(isFormatted){
		for(i1=0;i1<hardpointsFormatted.length;i1++){
			if(hardpointsFormatted[i1].length){
				hardpointsFormatted[i1].sort(function(a,b){return a[2]-b[2]})
				document.getElementById(`output`).innerHTML+=hardpointsFormatted[i1].map(e=>e.join(` `)).join(``)
			}
		}
	}else{
		document.getElementById(`output`).innerHTML=hardpoints.map(e=>e.join(` `)).join(``)
	}
}
function copyHardpoints(){
	if(isFormatted){
		navigator.clipboard.writeText(
			hardpointsFormatted[0].map(e=>e.join(` `)).join(``)+
			hardpointsFormatted[1].map(e=>e.join(` `)).join(``)+
			hardpointsFormatted[2].map(e=>e.join(` `)).join(``)+
			hardpointsFormatted[3].map(e=>e.join(` `)).join(``)
		)
	}else{
		navigator.clipboard.writeText(hardpoints.map(e=>e.join(` `)).join(``))
	}
}
//	Informational
function lockX(){
	if(xAxisLocked){
		document.getElementById(`yCoordinate`).classList.remove(`blocked`)
		xAxisLocked=false
	}else{
		document.getElementById(`yCoordinate`).classList.add(`blocked`)
		xAxisLocked=true
	}
	drawImage()
}
function lockY(){
	if(yAxisLocked){
		document.getElementById(`xCoordinate`).classList.remove(`blocked`)
		yAxisLocked=false
	}else{
		document.getElementById(`xCoordinate`).classList.add(`blocked`)
		yAxisLocked=true
	}
	drawImage()
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
//	Display Image
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
function drawImage(){
	loaded=true
	canvasContext.clearRect(0,0,canvas.width,canvas.height)
	if(image){
		canvasContext.drawImage(image,0,0,canvas.width,canvas.height)
	}
	imageData=canvasContext.getImageData(0,0,canvas.width,canvas.height)
	pixels=imageData.data
	swizzleImage()
	outlineImage()
	canvasContext.putImageData(imageData,0,0)
	drawCursor()
}
function drawCursor(){
	var x=xCoordinate*2+.5*canvas.width
	var y=yCoordinate*2+.5*canvas.height
	drawArc(x,y,5,0,2*Math.PI,`#f00`)
	if(xAxisLocked){
		drawLine(x-20,y,x+20,y,[15,10],1.5,`#f00`)
	}else if(yAxisLocked){
		drawLine(x,y-20,x,y+20,[15,10],1.5,`#f00`)
	}
	if(isMirrored){
		var rx=canvas.width-x
		drawArc(rx,y,5,0,2*Math.PI,`#f00`)
		if(xAxisLocked){
			drawLine(rx-20,y,rx+20,y,[15,10],1.5,`#f00`)
		}else if(yAxisLocked){
			drawLine(rx,y-20,rx,y+20,[15,10],1.5,`#f00`)
		}
		drawLine(canvas.width/2,0,canvas.width/2,canvas.height,[20,10],1.5,`#f00`)
		document.getElementById(`xCoordinate`).innerHTML=`X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+` (`+Math.round(((xCoordinate*(inflation*scale))*-1)*2)/2+`)`
	}else{
		document.getElementById(`xCoordinate`).innerHTML=`X: `+Math.round((xCoordinate*(inflation*scale))*2)/2
	}
	document.getElementById(`yCoordinate`).innerHTML=`Y: `+Math.round((yCoordinate*(inflation*scale))*2)/2
}
function drawArc(x,y,radius,start,end,colour){
	canvasContext.beginPath()
	canvasContext.arc(x,y,radius,start,end)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=1.5
	canvasContext.strokeStyle=colour
	canvasContext.stroke()
}
function drawLine(startX,startY,endX,endY,lineDash,width,colour){
	canvasContext.beginPath()
	canvasContext.moveTo(startX,startY)
	canvasContext.lineTo(endX,endY)
	canvasContext.setLineDash(lineDash)
	canvasContext.lineWidth=width
	canvasContext.strokeStyle=colour
	canvasContext.stroke()
}

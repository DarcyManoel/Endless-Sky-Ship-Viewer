var canvas=document.getElementById(`canvas`)
var canvasContext=canvas.getContext(`2d`)
var formatting=true
var hardpoints=[[],[],[],[]]
var hardpointsFormatted=[[],[],[],[]]
var isDragging=false
var mirror=false
var outline=false
var swizzle=0
var xAxisLocked=false
var yAxisLocked=false
function initialize(){
	canvas.addEventListener(`mousedown`,onMouseDown)
	canvas.addEventListener(`mousemove`,onMouseMove)
	document.body.addEventListener(`mouseup`,onMouseUp)
}
//	User Input
function actionLoadImage(){
	hardpoints=[[],[],[],[]]
	hardpointsFormatted=[[],[],[],[]]
	document.getElementById(`output`).innerHTML=``
	document.getElementById(`swizzle`).classList.remove(`blocked`)
	document.getElementById(`outline`).classList.remove(`blocked`)
	document.getElementById(`mirror`).classList.remove(`blocked`)
	document.getElementById(`formatting`).classList.remove(`blocked`)
	document.getElementById(`hardpoints`).classList.remove(`blocked`)
	document.getElementById(`xCoordinate`).classList.remove(`blocked`)
	document.getElementById(`yCoordinate`).classList.remove(`blocked`)
	document.getElementById(`copy`).classList.remove(`blocked`)
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
function actionSwizzle(){
	switch(swizzle){
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			swizzle++
			break
		case 6:
			swizzle=0
			break
	}
	drawImage()
}
function actionOutline(){
	switch(outline){
		case false:
			outline=true
			document.getElementById(`outline`).classList.remove(`dark`)
			break
		case true:
			outline=false
			document.getElementById(`outline`).classList.add(`dark`)
			break
	}
	drawImage()
}
function actionMirror(){
	switch(mirror){
		case false:
			mirror=true
			document.getElementById(`mirror`).classList.remove(`dark`)
			break
		case true:
			mirror=false
			document.getElementById(`mirror`).classList.add(`dark`)
			break
	}
	drawImage()
}
function actionFormatting(){
	switch(formatting){
		case false:
			formatting=true
			document.getElementById(`formatting`).classList.remove(`dark`)
			break
		case true:
			formatting=false
			document.getElementById(`formatting`).classList.add(`dark`)
			break
	}
	printHardpoints()
}
function actionHardpoint(type){
	switch(type){
		case `gun`:
			hardpointsFormatted[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpointsFormatted[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `turret`:
			hardpointsFormatted[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpointsFormatted[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `fighter`:
			hardpointsFormatted[2].push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpointsFormatted[2].push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `drone`:
			hardpointsFormatted[2].push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpointsFormatted[2].push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `engine`:
			hardpointsFormatted[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			hardpoints.push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
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
			if(mirror){
				hardpointsFormatted[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
				hardpoints.push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
	}
	console.log(hardpointsFormatted)
	printHardpoints()
}
function actionLockX(){
	switch(xAxisLocked){
		case false:
			document.getElementById(`yCoordinate`).classList.add(`blocked`)
			xAxisLocked=true
			break
		case true:
			document.getElementById(`yCoordinate`).classList.remove(`blocked`)
			xAxisLocked=false
			break
	}
	drawImage()
}
function actionLockY(){
	switch(yAxisLocked){
		case false:
			document.getElementById(`xCoordinate`).classList.add(`blocked`)
			yAxisLocked=true
			break
		case true:
			document.getElementById(`xCoordinate`).classList.remove(`blocked`)
			yAxisLocked=false
			break
	}
	drawImage()
}
function actionCopy(){
	switch(formatting){
		case false:
			navigator.clipboard.writeText(hardpoints.map(e=>e.join(` `)).join(``))
			break
		case true:
			navigator.clipboard.writeText(
				hardpointsFormatted[0].map(e=>e.join(` `)).join(``)+
				hardpointsFormatted[1].map(e=>e.join(` `)).join(``)+
				hardpointsFormatted[2].map(e=>e.join(` `)).join(``)+
				hardpointsFormatted[3].map(e=>e.join(` `)).join(``)
			)
			break
	}
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
function swizzleImage(){
	document.getElementById(`swizzle`).innerHTML=`Swizzle `+swizzle
	var SWIZZLE=[
		[0,1,2],
		[0,2,1],
		[1,0,2],
		[2,0,1],
		[1,2,0],
		[2,1,0],
		[1,2,2]
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
//	Display Extras
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
function outlineImage(){
	if(outline){
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
function drawCursor(){
	var x=xCoordinate*2+.5*canvas.width
	var y=yCoordinate*2+.5*canvas.height
	drawArc(x,y,5,0,2*Math.PI,`#f00`)
	if(xAxisLocked){
		drawLine(x-20,y,x+20,y,[15,10],1.5,`#f00`)
	}else if(yAxisLocked){
		drawLine(x,y-20,x,y+20,[15,10],1.5,`#f00`)
	}
	if(mirror){
		var rx=canvas.width-x
		drawArc(rx,y,5,0,2*Math.PI,`#f00`)
		if(xAxisLocked){
			drawLine(rx-20,y,rx+20,y,[15,10],1.5,`#f00`)
		}else if(yAxisLocked){
			drawLine(rx,y-20,rx,y+20,[15,10],1.5,`#f00`)
		}
		drawLine(canvas.width/2,0,canvas.width/2,canvas.height,[20,10],1.5,`#f00`)
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+` (`+Math.round(((xCoordinate*(inflation*scale))*-1)*2)/2+`)&nbsp;`
	}else{
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+`&nbsp;`
	}
	document.getElementById(`yCoordinate`).innerHTML=`&nbsp;Y: `+Math.round((yCoordinate*(inflation*scale))*2)/2+`&nbsp;`
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
//	Misc
function printHardpoints(){
	document.getElementById(`output`).innerHTML=``
	switch(formatting){
		case false:
			document.getElementById(`output`).innerHTML=hardpoints.map(e=>e.join(` `)).join(``)
			break
		case true:
			for(i1=0;i1<hardpointsFormatted.length;i1++){
				if(hardpointsFormatted[i1].length){
					hardpointsFormatted[i1].sort(function(a,b){return a[2]-b[2]})
					document.getElementById(`output`).innerHTML+=hardpointsFormatted[i1].map(e=>e.join(` `)).join(``)
				}
			}
			break
	}
}

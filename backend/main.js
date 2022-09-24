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
	for(var i1=0;i1<pixels.length;i1+=4){
		var red=pixels[i1+SWIZZLE[swizzle][0]]
		var green=pixels[i1+SWIZZLE[swizzle][1]]
		var blue=pixels[i1+SWIZZLE[swizzle][2]]
		pixels[i1+0]=red
		pixels[i1+1]=green
		pixels[i1+2]=blue
	}
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
	switch(mirror){
		case 0:
			document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+`&nbsp;`
			break
		case 1:
			var rx=canvas.width-x
			drawArc(rx,y,5,0,2*Math.PI,`#f00`)
			if(xAxisLocked){
				drawLine(rx-20,y,rx+20,y,[15,10],1.5,`#f00`)
			}else if(yAxisLocked){
				drawLine(rx,y-20,rx,y+20,[15,10],1.5,`#f00`)
			}
			drawLine(canvas.width/2,0,canvas.width/2,canvas.height,[20,10],1.5,`#f00`)
			document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+` (`+Math.round(((xCoordinate*(inflation*scale))*-1)*2)/2+`)&nbsp;`
			break
	}
	document.getElementById(`yCoordinate`).innerHTML=`&nbsp;Y: `+Math.round((yCoordinate*(inflation*scale))*2)/2+`&nbsp;`
}

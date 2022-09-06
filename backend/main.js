function drawImage(){
	loaded=true;
	canvasContext.clearRect(0,0,canvas.width,canvas.height);
	if(image){
		canvasContext.drawImage(image,0,0,canvas.width,canvas.height);
	};
	imageData=canvasContext.getImageData(0,0,canvas.width,canvas.height);
	pixels=imageData.data;
	swizzleImage();
	outlineImage();
	canvasContext.putImageData(imageData,0,0);
	drawCursor();
};
function swizzleImage(){
	document.getElementById(`swizzle`).innerHTML=`Swizzle `+swizzle;
	var SWIZZLE=[
		[0,1,2],
		[0,2,1],
		[1,0,2],
		[2,0,1],
		[1,2,0],
		[2,1,0],
		[1,2,2]
	];
	for(var i=0;i<pixels.length;i+=4){
		var red=pixels[i+SWIZZLE[swizzle][0]];
		var green=pixels[i+SWIZZLE[swizzle][1]];
		var blue=pixels[i+SWIZZLE[swizzle][2]];
		pixels[i+0]=red;
		pixels[i+1]=green;
		pixels[i+2]=blue;
	};
};
function outlineImage(){
	if(outline){
		document.getElementById(`outline`).innerHTML=`Outline Shown`;
		var i=0;
		for(var i=0;i<pixels.length&&!pixels[i+3];i+=4){};
		var start=i;
		var DIR=[
			pixels.length-4*canvas.width,
			pixels.length-4*canvas.width+4,
			4,
			4*canvas.width+4,
			4*canvas.width,
			4*canvas.width-4,
			pixels.length-4,
			pixels.length-4*canvas.width-4
		];
		var d=0;
		do{
			pixels[i+0]=255;
			pixels[i+1]=0;
			pixels[i+2]=0;
			pixels[i+3]=255;
			while(!pixels[(i+3+DIR[d])%pixels.length]){d=(d+1)%8;}
			i=(i+DIR[d])%pixels.length;
			d=(d+6)%8;
		}while(i!=start);
	}else{
		document.getElementById(`outline`).innerHTML=`Outline Hidden`;
	};
};
function drawCursor(){
	var x=xCoordinate*2+.5*canvas.width;
	var y=yCoordinate*2+.5*canvas.height;
	drawArc(x,y,5,0,2*Math.PI,`#f00`);
	if(xAxisLocked){
		drawLine(x-20,y,x+20,y,[15,10],1.5,`#f00`);
	}else if(yAxisLocked){
		drawLine(x,y-20,x,y+20,[15,10],1.5,`#f00`);
	};
	if(mirror){
		var rx=canvas.width-x;
		drawArc(rx,y,5,0,2*Math.PI,`#f00`);
		if(xAxisLocked){
			drawLine(rx-20,y,rx+20,y,[15,10],1.5,`#f00`);
		}else if(yAxisLocked){
			drawLine(rx,y-20,rx,y+20,[15,10],1.5,`#f00`);
		};
		drawLine(canvas.width/2,0,canvas.width/2,canvas.height,[20,10],1.5,`#f00`);
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+` (`+Math.round(((xCoordinate*(inflation*scale))*-1)*2)/2+`)&nbsp;`;
	}else{
		document.getElementById(`xCoordinate`).innerHTML=`&nbsp;X: `+Math.round((xCoordinate*(inflation*scale))*2)/2+`&nbsp;`;
	};
	document.getElementById(`yCoordinate`).innerHTML=`&nbsp;Y: `+Math.round((yCoordinate*(inflation*scale))*2)/2+`&nbsp;`;
};

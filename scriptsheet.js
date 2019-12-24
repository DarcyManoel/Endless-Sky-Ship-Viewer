var coordinates=[];
var image;
var isDragging;
var loaded;
var mirror;
var outline;
var reader;
var scale=2;
var swizzle=0;
var xCoordinate;
var yCoordinate;
function addPoint(name){
	if(isNaN(xCoordinate)||isNaN(yCoordinate))
		{return;}
	if(mirror){
		coordinates.push(name+" "+xCoordinate+" "+yCoordinate);
		if(xCoordinate!=0)
			{coordinates.push(name+" "+(xCoordinate*-1)+" "+yCoordinate);}
	}
	else
		{coordinates.push(name+" "+xCoordinate+" "+yCoordinate);}
	document.getElementById("points").innerHTML=coordinates.join("<br>");
}
function undoPoint(){
	coordinates.pop()
	document.getElementById("points").innerHTML=coordinates.join("<br>");
}
function changeSwizzle(){
	if(swizzle<6)
		{swizzle++;}
	else
		{swizzle=0;}
	drawImage();
}
function control(event){
	if(loaded){
		if(event.keycode==37)
			{xCoordinate-=.5;}
		else if(event.keycode==38)
			{yCoordinate-=.5;}
		else if(event.keycode==39)
			{xCoordinate+=.5;}
		else if(event.keycode==40)
			{yCoordinate+=.5;}
		drawImage();
	}
}
function createImage(){
	image=new Image();
	image.onload=imageLoaded;
	image.src=reader.result;
}
function drawCoordinates(x,y){
	xCoordinate=.5*(x-.5*canvas.width);
	yCoordinate=.5*(y-.5*canvas.height);
	drawImage();
}
function drawImage(){
	loaded=true;
	document.getElementById("canvas").classList.remove("hidden");
	document.getElementById("coordinates").classList.remove("hidden");
	document.getElementById("drone").classList.remove("hidden");
	document.getElementById("engine").classList.remove("hidden");
	document.getElementById("fighter").classList.remove("hidden");
	document.getElementById("gun").classList.remove("hidden");
	document.getElementById("mirror").classList.remove("hidden");
	document.getElementById("outline").classList.remove("hidden");
	document.getElementById("points").classList.remove("hidden");
	document.getElementById("swizzle").classList.remove("hidden");
	document.getElementById("turret").classList.remove("hidden");
	document.getElementById("undo").classList.remove("hidden");
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
	document.getElementById("imageSize").innerHTML=(canvas.width/2)+"px by "+(canvas.height/2)+"px";
	if(image)
		{context.drawImage(image,0,0,canvas.width,canvas.height);}
	document.getElementById("swizzle").innerHTML="Swizzle "+swizzle;
	var SWIZZLE=[
		[0,1,2],
		[0,2,1],
		[1,0,2],
		[2,0,1],
		[1,2,0],
		[2,1,0],
		[1,2,2]
	];
	var imageData=context.getImageData(0,0,canvas.width,canvas.height);
	var pixels=imageData.data;
	for(var i=0;i<pixels.length;i+=4){
		var red=pixels[i+SWIZZLE[swizzle][0]];
		var green=pixels[i+SWIZZLE[swizzle][1]];
		var blue=pixels[i+SWIZZLE[swizzle][2]];
		pixels[i+0]=red;
		pixels[i+1]=green;
		pixels[i+2]=blue;
	}
	if(outline){
		document.getElementById("outline").innerHTML="Outline Shown";
		var i=0;
		for(var i=0;i<pixels.length&&!pixels[i+3];i+=4){}
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
		}
		while(i!=start);
	}
	else
		{document.getElementById("outline").innerHTML="Outline Hidden";}
	context.putImageData(imageData,0,0);
	if(isNaN(xCoordinate)||isNaN(yCoordinate))
		{return;}
	var x=xCoordinate*2+.5*canvas.width;
	var y=yCoordinate*2+.5*canvas.height;
	context.beginPath();
	context.arc(x,y,5,0,2*Math.PI,false);
	context.setLineDash([]);
	context.lineWidth=1;
	context.strokeStyle="#F00";
	context.stroke();
	if(mirror){
		var rx=canvas.width-x;
		context.beginPath();
		context.arc(rx,y,5,0,2*Math.PI,false);
		context.setLineDash([]);
		context.stroke();
		context.beginPath();
		context.setLineDash([20,10]);
		context.moveTo(canvas.width/2,0);
		context.lineTo(canvas.width/2,canvas.height);
		context.lineWidth=1.5;
		context.stroke();
		document.getElementById("xCoordinate").innerHTML="X: "+xCoordinate+" ("+(xCoordinate*-1)+")";
	}
	else
		{document.getElementById("xCoordinate").innerHTML="X: "+xCoordinate;}
	document.getElementById("yCoordinate").innerHTML="Y: "+yCoordinate;
}
function imageLoaded(){
	var canvas=document.getElementById("canvas");
	canvas.width=image.width*scale;
	canvas.height=image.height*scale;
	xCoordinate=0;
	yCoordinate=0;
	drawImage();
	coordinates=[];
	document.getElementById("points").innerHTML=coordinates.join("<br>");
}
function initialize(){
	var canvas=document.getElementById("canvas");
	canvas.addEventListener("mousedown",onMouseDown);
	canvas.addEventListener("mousemove",onMouseMove);
	document.body.addEventListener("mouseup",onMouseUp);
}
function loadImage(){
	if(typeof window.FileReader!=="function")
		{return;}
	var input=document.getElementById("file");
	if(!input||!input.files||!input.files[0])
		{return;}
	reader=new FileReader();
	reader.onload=createImage;
	var file=input.files[0];
	reader.readAsDataURL(file);
	if(file.name.lastIndexOf("@2x")==file.name.lastIndexOf(".")-3)
		{scale=1;}
	else
		{scale=2;}
}
function onMouseDown(event){
	isDragging=true;
	drawCoordinates(event.offsetX,event.offsetY);
}
function onMouseMove(event){
	if(!isDragging)
		{return;}
	drawCoordinates(event.offsetX,event.offsetY);
}
function onMouseUp(event){
	isDragging=false;
}
function slideLeft(){
	document.getElementById("left").classList.toggle("side");
	document.getElementById("left").classList.toggle("slide");
}
function slideRight(){
	document.getElementById("right").classList.toggle("side");
	document.getElementById("right").classList.toggle("slide");
}
function toggleDialog(){
	document.getElementById("dialogScreen").classList.toggle("hidden");
}
function toggleMirror(){
	if(!mirror){
		mirror=1;
		document.getElementById("mirror").innerHTML="Mirror On";
	}
	else{
		mirror=0;
		document.getElementById("mirror").innerHTML="Mirror Off";
	}
	drawImage();
}
function toggleOutline(){
	if(!outline)
		{outline=1;}
	else
		{outline=0;}
	drawImage();
}
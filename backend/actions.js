var help=false
var swizzle=0
var outline
var mirror
var hardpoints=[[],[],[],[]]
var xAxisLocked
var yAxisLocked
function toggleHelp(){
	switch(help){
		case true:
			document.getElementById(`helpToggle`).innerHTML=`Help Me!`
			document.getElementById(`help`).classList.add(`hidden`)
			document.getElementById(`swizzle`).style=``
			document.getElementById(`outline`).style=``
			document.getElementById(`mirror`).style=``
			document.getElementById(`addHardpoints`).style=``
			help=false
			break
		case false:
			document.getElementById(`helpToggle`).innerHTML=`Don't Help Me!`
			document.getElementById(`help`).classList.remove(`hidden`)
			document.getElementById(`swizzle`).style=`border-right:1px solid #fff`
			document.getElementById(`outline`).style=`border-right:1px solid #fff`
			document.getElementById(`mirror`).style=`border-right:1px solid #fff`
			document.getElementById(`addHardpoints`).style=`border-right:1px solid #fff`
			help=true
			break
	}
	localStorage.setItem(`help`,help)
}
function changeSwizzle(){
	if(swizzle<6){
		swizzle++
	}else{
		swizzle=0
	}
	drawImage()
}
function toggleOutline(){
	if(!outline){
		outline=1
		document.getElementById(`outline`).innerHTML=`Outline Shown`
	}else{
		outline=0
		document.getElementById(`outline`).innerHTML=`Outline Hidden`
	}
	drawImage()
}
function toggleMirror(){
	if(!mirror){
		mirror=1
		document.getElementById(`mirror`).innerHTML=`Mirror On`
	}else{
		mirror=0
		document.getElementById(`mirror`).innerHTML=`Mirror Off`
	}
	drawImage()
}
function addHardpoint(type){
	switch(type){
		case `gun`:
			hardpoints[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			if(mirror){
				hardpoints[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			}
			break
		case `turret`:
			hardpoints[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			if(mirror){
				hardpoints[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			}
			break
		case `fighter`:
			hardpoints[2].push([`\tbay "fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			if(mirror){
				hardpoints[2].push([`\tbay "fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			}
			break
		case `drone`:
			hardpoints[2].push([`\tbay "drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			if(mirror){
				hardpoints[2].push([`\tbay "drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			}
			break
		case `engine`:
			hardpoints[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			if(mirror){
				hardpoints[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			}
			break
		case `left`:
			hardpoints[3].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tangle 90\n\t\tleft\n`])
			break
		case `right`:
			hardpoints[3].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n\t\tangle 270\n\t\tright\n`])
			break
		case `reverse`:
			hardpoints[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			if(mirror){
				hardpoints[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2+`\n`])
			}
			break
	}
	console.log(hardpoints)
	document.getElementById(`hardpoints`).innerHTML=``
	if(hardpoints[0].length){
		document.getElementById(`hardpoints`).innerHTML+=hardpoints[0].map(e=>e.join(` `)).join(``)
	}
	if(hardpoints[1].length){
		document.getElementById(`hardpoints`).innerHTML+=hardpoints[1].map(e=>e.join(` `)).join(``)
	}
	if(hardpoints[2].length){
		document.getElementById(`hardpoints`).innerHTML+=hardpoints[2].map(e=>e.join(` `)).join(``)
	}
	if(hardpoints[3].length){
		document.getElementById(`hardpoints`).innerHTML+=hardpoints[3].map(e=>e.join(` `)).join(``)
	}
}
function lockXAxis(){
	if(xAxisLocked){
		document.getElementById(`yCoordinate`).classList.remove(`blocked`)
		xAxisLocked=false
		drawImage()
	}else{
		document.getElementById(`xCoordinate`).classList.remove(`blocked`)
		document.getElementById(`yCoordinate`).classList.add(`blocked`)
		yAxisLocked=false
		xAxisLocked=true
		drawImage()
	}
}
function lockYAxis(){
	if(yAxisLocked){
		document.getElementById(`xCoordinate`).classList.remove(`blocked`)
		yAxisLocked=false
		drawImage()
	}else{
		document.getElementById(`xCoordinate`).classList.add(`blocked`)
		document.getElementById(`yCoordinate`).classList.remove(`blocked`)
		xAxisLocked=false
		yAxisLocked=true
		drawImage()
	}
}
function copyPoints(){
	navigator.clipboard.writeText(
		hardpoints[0].map(e=>e.join(` `)).join(``)+
		hardpoints[1].map(e=>e.join(` `)).join(``)+
		hardpoints[2].map(e=>e.join(` `)).join(``)+
		hardpoints[3].map(e=>e.join(` `)).join(``)
	)
}

var help=false
var swizzle=0
var outline
var mirror
var hardpoints=[[],[],[]]
var xAxisLocked
var yAxisLocked
function toggleHelp(){
	switch(help){
		case true:
			document.getElementById(`help`).innerHTML=`Help Me!`
			document.getElementById(`helpUpload`).classList.add(`hidden`)
			document.getElementById(`helpSwizzle`).classList.add(`hidden`)
			document.getElementById(`swizzle`).style=``
			document.getElementById(`helpOutline`).classList.add(`hidden`)
			document.getElementById(`outline`).style=``
			document.getElementById(`helpMirror`).classList.add(`hidden`)
			document.getElementById(`mirror`).style=``
			document.getElementById(`helpHardpoints`).classList.add(`hidden`)
			document.getElementById(`addHardpoints`).style=``
			help=false
			break
		case false:
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
			hardpoints[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			if(mirror){
				hardpoints[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2])
			}
			break
		case `turret`:
			hardpoints[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			if(mirror){
				hardpoints[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2])
			}
			break
		case `fighter`:
			hardpoints[1].push([`\tbay "fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			if(mirror){
				hardpoints[1].push([`\tbay "fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2])
			}
			break
		case `drone`:
			hardpoints[1].push([`\tbay "drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			if(mirror){
				hardpoints[1].push([`\tbay "drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2])
			}
			break
		case `engine`:
			hardpoints[2].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			if(mirror){
				hardpoints[2].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2])
			}
			break
		case `left`:
			hardpoints[2].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			hardpoints[2].push([`\t\tangle 90`])
			hardpoints[2].push([`\t\tleft`])
			break
		case `right`:
			hardpoints[2].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			hardpoints[2].push([`\t\tangle 270`])
			hardpoints[2].push([`\t\tright`])
			break
		case `reverse`:
			hardpoints[2].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2])
			if(mirror){
				hardpoints[2].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2])
			}
			break
	}
	console.log(hardpoints)
	document.getElementById(`hardpoints`).innerHTML=
		hardpoints[0].map(e=>e.join(` `)).join(`\n`)+
		`\n`+
		hardpoints[1].map(e=>e.join(` `)).join(`\n`)+
		`\n`+
		hardpoints[2].map(e=>e.join(` `)).join(`\n`)
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
		hardpoints[0].map(e=>e.join(` `)).join(`\n`)+
		`\n`+
		hardpoints[1].map(e=>e.join(` `)).join(`\n`)+
		`\n`+
		hardpoints[2].map(e=>e.join(` `)).join(`\n`)
	)
}

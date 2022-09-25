var help=false
var swizzle=0
var outline=0
var mirror=0
var hardpoints=[[],[],[],[]]
var xAxisLocked=0
var yAxisLocked=0
function toggleHelp(){
	switch(help){
		case true:
			document.getElementById(`helpToggle`).innerHTML=`Help Me!`
			document.getElementById(`help`).classList.add(`hidden`)
			document.getElementById(`swizzle`).style=``
			document.getElementById(`outline`).style=``
			document.getElementById(`mirror`).style=``
			document.getElementById(`hardpoints`).style=``
			help=false
			break
		case false:
			document.getElementById(`helpToggle`).innerHTML=`Don't Help Me!`
			document.getElementById(`help`).classList.remove(`hidden`)
			document.getElementById(`swizzle`).style=`border-right:1px solid #fff`
			document.getElementById(`outline`).style=`border-right:1px solid #fff`
			document.getElementById(`mirror`).style=`border-right:1px solid #fff`
			document.getElementById(`hardpoints`).style=`border-right:1px solid #fff`
			help=true
			break
	}
	localStorage.setItem(`help`,help)
}
function changeSwizzle(){
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
function toggleOutline(){
	switch(outline){
		case 0:
			outline++
			document.getElementById(`outline`).innerHTML=`Outline Shown`
			break
		case 1:
			outline=0
			document.getElementById(`outline`).innerHTML=`Outline Hidden`
			break
	}
	drawImage()
}
function toggleMirror(){
	switch(mirror){
		case 0:
			mirror++
			document.getElementById(`mirror`).innerHTML=`Mirror On`
			break
		case 1:
			mirror=0
			document.getElementById(`mirror`).innerHTML=`Mirror Off`
			break
	}
	drawImage()
}
function addHardpoint(type){
	switch(type){
		case `gun`:
			hardpoints[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[0].push([`\tgun`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `turret`:
			hardpoints[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[1].push([`\tturret`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `fighter`:
			hardpoints[2].push([`\tbay "fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[2].push([`\tbay "fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `drone`:
			hardpoints[2].push([`\tbay "drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[2].push([`\tbay "drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `engine`:
			hardpoints[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[3].push([`\tengine`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `left`:
			hardpoints[3].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n\t\tangle 90\n\t\tleft\n`])
			break
		case `right`:
			hardpoints[3].push([`\t"steering engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n\t\tangle 270\n\t\tright\n`])
			break
		case `reverse`:
			hardpoints[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[3].push([`\t"reverse engine"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
	}
	console.log(hardpoints)
	document.getElementById(`output`).innerHTML=``
	for(i1=0;i1<hardpoints.length;i1++){
		if(hardpoints[i1].length){
			hardpoints[i1].sort(function(a,b){return a[2]-b[2]})
			document.getElementById(`output`).innerHTML+=hardpoints[i1].map(e=>e.join(` `)).join(``)
		}
	}
}
function lockXAxis(){
	switch(xAxisLocked){
		case 0:
			document.getElementById(`yCoordinate`).classList.add(`blocked`)
			xAxisLocked=1
			break
		case 1:
			document.getElementById(`yCoordinate`).classList.remove(`blocked`)
			xAxisLocked=0
			break
	}
	drawImage()
}
function lockYAxis(){
	switch(yAxisLocked){
		case 0:
			document.getElementById(`xCoordinate`).classList.add(`blocked`)
			yAxisLocked=1
			break
		case 1:
			document.getElementById(`xCoordinate`).classList.remove(`blocked`)
			yAxisLocked=0
			break
	}
	drawImage()
}
function copyOutput(){
	navigator.clipboard.writeText(
		hardpoints[0].map(e=>e.join(` `)).join(``)+
		hardpoints[1].map(e=>e.join(` `)).join(``)+
		hardpoints[2].map(e=>e.join(` `)).join(``)+
		hardpoints[3].map(e=>e.join(` `)).join(``)
	)
}

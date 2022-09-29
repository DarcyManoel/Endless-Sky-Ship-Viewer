var swizzle=0
var outline=false
var mirror=false
var hardpoints=[[],[],[],[]]
var xAxisLocked=false
var yAxisLocked=false
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
function toggleMirror(){
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
			hardpoints[2].push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[2].push([`\tbay "Fighter"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			}
			break
		case `drone`:
			hardpoints[2].push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
			if(mirror){
				hardpoints[2].push([`\tbay "Drone"`,Math.round((xCoordinate*(inflation*scale))*2)/2*-1,Math.round((yCoordinate*(inflation*scale))*2)/2,`\n`])
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
function lockYAxis(){
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
function copyOutput(){
	navigator.clipboard.writeText(
		hardpoints[0].map(e=>e.join(` `)).join(``)+
		hardpoints[1].map(e=>e.join(` `)).join(``)+
		hardpoints[2].map(e=>e.join(` `)).join(``)+
		hardpoints[3].map(e=>e.join(` `)).join(``)
	)
}

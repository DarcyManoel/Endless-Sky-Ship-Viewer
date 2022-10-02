var swizzle=0
var outline=false
var mirror=false
var formatting=true
var hardpointsFormatted=[[],[],[],[]]
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
function toggleFormatting(){
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
function addHardpoint(type){
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

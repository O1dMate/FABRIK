let SCREEN_WIDTH = 0;
let SCREEN_HEIGHT = 0;

// Drawing functions to handled inverted Y-Axis of the browser
const drawRect = (x, y, w, h) => rect(x, SCREEN_HEIGHT-y, w, h);
const drawLine = (x1, y1, x2, y2) => line(x1, SCREEN_HEIGHT-y1, x2, SCREEN_HEIGHT-y2);
const drawCircle = (x, y, d) => circle(x, SCREEN_HEIGHT-y, d);
const drawArc = (x, y, w, h, startAngle, stopAngle) => arc(x, SCREEN_HEIGHT-y, w, h, 2*Math.PI-stopAngle, 2*Math.PI-startAngle);
const drawTri = (x1, y1, x2, y2, x3, y3) => triangle(x1, SCREEN_HEIGHT-y1, x2, SCREEN_HEIGHT-y2, x3, SCREEN_HEIGHT-y3);
const drawText = (str, x, y) => text(str, x, SCREEN_HEIGHT-y);

let pointChain;
let originPoint;
let targetPoint;
let distanceBetweenPoints = 200;

let frame = 0;

// Initial Setup
function setup() {
	SCREEN_WIDTH = window.innerWidth - 20;
	SCREEN_HEIGHT = window.innerHeight - 20

	createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

	originPoint = {
		x: SCREEN_WIDTH / 2,
		y: SCREEN_HEIGHT / 2,
	};

	targetPoint = {
		x: SCREEN_WIDTH / 2,
		y: SCREEN_HEIGHT / 2 + 200,
	};

	pointChain = [
		{
			x: SCREEN_WIDTH / 2,
			y: SCREEN_HEIGHT / 2,
		},
		{
			x: SCREEN_WIDTH / 2 - 2*distanceBetweenPoints,
			y: SCREEN_HEIGHT / 2 - 100,
		},
		{
			x: SCREEN_WIDTH / 2 - 2*distanceBetweenPoints,
			y: SCREEN_HEIGHT / 2 - 150,
		},
		{
			x: SCREEN_WIDTH / 2 - 2*distanceBetweenPoints,
			y: SCREEN_HEIGHT / 2 - 150,
		},
		{
			x: SCREEN_WIDTH / 2 - 2*distanceBetweenPoints,
			y: SCREEN_HEIGHT / 2 - 200,
		},
	];

	frameRate(60);
}


// To be called each frame
function draw() {
	// Draw background & set Rectangle draw mode
	background(255);
	rectMode(CENTER);

	// Draw scene rectangle
	fill(30,30,30);
	stroke(255,255,255);
	drawRect(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_WIDTH, SCREEN_HEIGHT)

	let pointSize = 50;
	let smallPointSize = pointSize-20;

	// Draw Origin
	fill(0, 0, 200);
	stroke(0, 0, 200);
	drawCircle(originPoint.x, originPoint.y, pointSize);

	// Draw Target
	fill(0, 128, 0);
	stroke(0, 128, 0);
	drawCircle(targetPoint.x, targetPoint.y, pointSize);


	// Draw Lines between Points
	fill(255, 255, 255);
	stroke(255, 255, 255);
	strokeWeight(3);
	for (let i = 0; i < pointChain.length-1; ++i) {
		drawLine(pointChain[i].x, pointChain[i].y, pointChain[i+1].x, pointChain[i+1].y)
	}
	strokeWeight(1);

	let currentPoint = null;
	for (let i = 0; i < pointChain.length; ++i) {
		currentPoint = pointChain[i];

		fill(200, 200, 0);
		stroke(200, 200, 0);
		drawCircle(currentPoint.x, currentPoint.y, smallPointSize);

		// stroke(0);
		// fill(0);
		// textAlign(CENTER, CENTER);
		// textSize(16);
		// drawText(`${i+1}`,currentPoint.x, currentPoint.y);
	}

	targetPoint.x = mouseX;
	targetPoint.y = SCREEN_HEIGHT-mouseY;

	calculateFabrik();

	++frame;
}



function calculateFabrik() {
	let iterations = 20;

	let theTargetPoint;

	for (let i = 0; i < iterations; ++i) {
		pointChain.reverse();

		theTargetPoint = (i % 2 === 0) ? targetPoint : originPoint;

		for (let a = 0; a < pointChain.length; ++a) {
			if (a === 0) {
				pointChain[0].x = theTargetPoint.x;
				pointChain[0].y = theTargetPoint.y;
			} else {
				let vectorBetween = {
					x: pointChain[a-1].x - pointChain[a].x,
					y: pointChain[a-1].y - pointChain[a].y
				};
				let size = Math.sqrt(vectorBetween.x**2 + vectorBetween.y**2);

				pointChain[a].x = pointChain[a-1].x - (vectorBetween.x/size)*distanceBetweenPoints;
				pointChain[a].y = pointChain[a-1].y - (vectorBetween.y/size)*distanceBetweenPoints;

			}
		}
	}
}
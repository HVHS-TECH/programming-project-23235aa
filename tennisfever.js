/*******************************************************/
// setup()
/*******************************************************/
let spawnTimer = 2000;
let rad = 15
function setup() {
	console.log("setup: ");
	canvasWidth = 500;
	canvasHeight = 500;
	cnv= new Canvas(canvasWidth, canvasHeight);
	wallLH  = new Sprite(0, 500/2, 8, 500, 'k');
	wallLH.color = 'black';
	wallRH  = new Sprite(500, 500/2, 5, 500, 'k');
	wallRH.color = 'blue';
	wallBot = new Sprite(250,500,500,50,'k');
	wallBot.color = 'red';
	wallTop = new Sprite(250, 10, 500, 50, 'k');
	player_1 = new Sprite(500/2, 500/2, 50, 'd');
	player_1.color = 'blue';
	player_1.vel.x = 5;
	player_1.bounciness = 5;
	player_1.friction = 20;
	player_1.drag = 1;	
	tennisBalls = new Group();
}
function draw() {
	background('white')
}
function mousePressed(){
	let dis = p5.Vector.dist(mouseDetection,target)
	if (dis > rad){
		target = new Sprite(targetWidth, targetHeight)
	}
}

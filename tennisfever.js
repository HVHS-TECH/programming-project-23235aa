/*******************************************************/
// setup()
/*******************************************************/
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
	shootTennisBalls();
};
function shootTennisBalls(){
	balls = new Sprite(player_1.x, player_1.y,10);
	balls.color = 'red'
	balls.speed = 5;
	//The tennis balls head toward the way the mouse is pointing. 
	balls.direction = balls.angleTo(mouse);
	//Added this feature so that the tennis balls don't collide with the player and go in weird directions.
	//Doing this the tennis balls overlap the player which means they can't collide. 
	balls.overlap(player_1);
	//added in groups to handle future colloisions with targets. 
	tennisBalls.add(balls);
	balls.life = 60;
}

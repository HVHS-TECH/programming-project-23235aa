/*******************************************************/
// setup()
/*******************************************************/
function setup() {
console.log("setup: ");
canvasWidth = 500;
canvasHeight = 500;
cnv= new Canvas(canvasWidth,canvasHeight);
wallLH  = new Sprite(0, 500/2, 8, 500, 'k');
wallLH.color = 'black';
wallRH  = new Sprite(500, 500/2, 5, 500, 'k');
wallRH.color = 'blue';
wallBot = new Sprite(250,500,500,50,'k');
wallBot.color = 'red';
wallTop = new Sprite(250, 10, 500, 50, 'k');
ball_1 = new Sprite(100/2, 500/2, 50, 'd');
ball_1.color = 'cyan';
ball_1.vel.x = 20;
ball_1.bounciness = 0.5;
ball_1.friction = 20;
ball_1.drag = 1;
targetGroup = new Group(); 
tennisBalls = new Group();
}
function draw() {
	background('white')
	ball_1.moveTowards(mouseX, mouseY, 0.5);

}
function keyPressed(){
		if (keyCode === 32){
			shootBalls();
	}
};

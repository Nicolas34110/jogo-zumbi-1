var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zumbi, zumbiImg, zumbiGroup;
var bala=50, bulletImg, bullet, bulletGroup;



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zumbiImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet.png");

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
createCanvas(windowWidth,windowHeight-30);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

bulletGroup = new Group();

zumbiGroup = new Group();
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){

  bullet = createSprite(displayWidth-1150, player.y-24,20,20);
  bullet.addImage(bulletImg);
  bullet.scale=0.05;
  bullet.velocityX=8;
  bulletGroup.add(bullet);
  bala-=1;

  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zumbiGroup.isTouching(bulletGroup)){
  for(var i =0; i<zumbiGroup.length; i++){
    if(zumbiGroup[i].isTouching(bulletGroup)){
      zumbiGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }

}

if(zumbiGroup.isTouching(player)){
  for(var i =0; i<zumbiGroup.length; i++){
    if(zumbiGroup[i].isTouching(player)){
      zumbiGroup[i].destroy();
  }
}
  

}

criarZumbi();

drawSprites();
}

function criarZumbi(){
  if(frameCount%60===0){
    zumbi = createSprite(random(1320,1400),random(80,700),40,40);
    zumbi.addImage(zumbiImg);
    zumbi.scale=0.2;
    zumbi.velocityX=-3;

    zumbiGroup.add(zumbi);

  }
}

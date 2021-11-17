class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200)
    car2 = createSprite(300,200)
    car3 = createSprite(500,200)
    car4 = createSprite(700,200)
    cars=[car1,car2,car3,car4];
    car1.addImage(carImg1)
    car2.addImage(carImg2)
    car3.addImage(carImg3)
    car4.addImage(carImg4)
    bananaGroup=new Group()
    this.addSprites(bananaGroup,7,bananaimg,0.2)
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();
    player.getFinishedPlayers();
    if(allPlayers !== undefined){
      background(groundImg)
      image(trackImg,0,-displayHeight*7,displayWidth,displayHeight*8)
      var display_position = 130;
      var index = 0
      var x = 175
      var y = 0 
      for(var plr in allPlayers){
        index = index + 1
        x = 200+ (index * 200) + allPlayers[plr].xPos;
        y = displayHeight - allPlayers[plr].distance
        cars[index - 1].x = x
        cars[index - 1].y = y
        if (plr === "player" + player.index){
          fill("red")
          ellipse(x,y,60,60)
          //cars[index-1].shapeColor ="red"
          camera.position.x = displayWidth/2
          camera.position.y = cars[index - 1].y 
        }else{fill("black")}
        textSize(15);
        text(allPlayers[plr].name + ":" + allPlayers[plr].distance, cars[index - 1].x-20,cars[index - 1].y+70)
      }
    }
        drawSprites();
    if(keyIsDown(UP_ARROW) && player.index !== null&& pastFinish!==true){
      player.distance +=20
      player.xPos += xVel;
      player.update();
    }
if(keyIsDown(RIGHT_ARROW)&& player.index !== null&& pastFinish!==true){
    xVel +=0.2
}
if(keyIsDown(LEFT_ARROW)&& player.index !== null&& pastFinish!==true){
  xVel -=0.2
}

  if(player.distance>=10000 && pastFinish===false && finishedPlayers<=4){
    //gameState = 2;
    Player.updateFinishedPlayers()
    player.rank =finishedPlayers;
    player.update();
    pastFinish=true;
   
  }
  }
  end(){
    console.log("Player reached the destination")
    camera.position.x = 0
          camera.position.y = 0
    Player.getPlayerInfo();
    for(var plr in allPlayers){
      if(allPlayers[plr].rank ===1){
        text("1st:" + allPlayers[plr].name, displayWidth/4,displayHeight/9);
       
      }
      else if(allPlayers[plr].rank ===2){
      text("2nd:" + allPlayers[plr].name, displayWidth/4,displayHeight/9 +20);
    
      }
    else if(allPlayers[plr].rank ===3){
    text("3rd:" + allPlayers[plr].name, displayWidth/4,displayHeight/9+40);
   
      }
  else {
  text("4th:" + allPlayers[plr].name, displayWidth/4,displayHeight/9+60);
 
      }
    }      // text("YOU WIN!!", displayWidth/2, displayHeight - allPlayers[plr].distance)
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }
}
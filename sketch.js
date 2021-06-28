//Create variables here
var database ;
var dog,happyDog,happydogImage,dogImage;
var washroom,bedroom,garden;
var feed,addFood,Bath,Sleep,Play,PlayInGarden,buttons;
var foodStock,foodS;
var lastfeed,feedTime;
var foodObj;
var gameState = "Hungry";
var milkBottle2;

function preload()
{
	//load images here
  dogImage = loadImage("images/dogImg.png");
  happydogImage = loadImage("images/dogImg1.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
  livingroom = loadImage("images/Living Room.png")
}

function setup() {
	createCanvas(1300, 600);

  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStock);
 
  dog = createSprite(1000,300,10,10);
  dog.addImage(dogImage)
  dog.scale=0.2

  foodObj = new Food();

  //read game state from datbase
  readState = database.ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });
}

function draw() {  
  background(46, 139, 87);

  feedTime = database.ref("feedTime");
  feedTime.on("value",function(data){
    lastfeed = data.val();
  });

  if(foodS!==undefined){
    fill("black");
  textSize(25);
  text("food Available:" + foodS,100,100);
    }
    
   fill (225,225,254);
   textSize(20);
   if(lastfeed >= 12){
     text("Last Feed : "+lastfeed%12 + "PM",50,50);
  }else if (lastfeed==0){
    text("Last Feed : 12 AM"+ lastfeed ,50,50);
  }else{
    text("Last Feed : "+ "AM",50,50)
  }

  currentTime = hour();
  if(currentTime == (lastfeed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime == (lastfeed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastfeed+2) && currentTime <+(lastfeed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  
  if(gameState !="Hungry"){
    feed.hide();
    add.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogImage);
  }
  
  foodObj.display();
  writeStock(foodS);

  if(foodS == 0){
    dog.addImage(happydogImage);
    milkBottle2.visible = false;
  }else{
    dog.addImage(dogImage);
    milkBottle2.visible = true;
  }

  if(gameState === 1){
    dog.addImage(happydogImage);
    dog.scale = 0.175;
    dog.y = 250;
  }

  if(gameState === 2){
    dog.addImage(dogImage);
    dog.scale = 0.175;
    milkBottle2.visible = false;
    dog.y = 250;
  }

  if(gameState === 3){
    dog.addImage(washroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  if(gameState === 4){
    dog.addImage(bedroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  if(gameState === 5){
    dog.addImage(livingroom);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

  if(gameState === 6){
    dog.addImage(garden);
    dog.scale = 1;
    milkBottle2.visible = false;
  }

drawSprites();
}

function namingDog()
{
  Name=input.value();
  button.hide();
  input.hide();
  database.ref("/").update({
    name:Name
  })

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  database.ref('/').update(
    {
      food:x
    }
  )
}

function AddFood(){
  foodS++;
  database.ref("/").update({
    food:foodS
  })
}

function FeedDog(){
  dog.addImage(happydogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food : foodObj.getFoodStock(),
    feedTime:hour(),
    gameState : "Hungry"
  })
}

// function to update game state in database
function update(state){
  database.ref("/").update({
    gameState : state
  });
}


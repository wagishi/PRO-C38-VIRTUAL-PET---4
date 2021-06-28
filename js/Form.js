class Form {
    constructor() {
        this.feed = createButton("h2");
        this.addFood = createButton("h2");
        this.Bath = createButton("h2");
        this.Sleep = createButton("h2");
        this.Play = createButton("h2");
        this.PlayInGarden = createButton("h2");
    }

    hide(){
    
    }
  
    display(){
  this.feed.html("Feed the dog");
  this.feed.position(400,125);
  if(this.feed.mousePressed(function(){
      foodS = foodS-1;
      gameState = 1;
      database.ref("/").update({"gamestate" : gameState})
  }));

  this.addFood.html("Add Food");
  this.addFood.position(500,125);
   if(this.addFood.mousePressed(function(){
       foodS = foodS+1;
       gameState = 2;
       database.ref("/").update({"gameState" : gameState})
   }));

   this.Bath.html("I want to take bath");
   this.Bath.position(580,125);
  if(this.Bath.mousePressed(function(){
    gameState = 3;
    database.ref("/").update({"gameState" : gameState})
  }));

  this.Sleep.html("I am very sleepy");
  this.Sleep.position(710,125);
  if(this.Sleep.mousePressed(function(){
    gameState = 4;
    database.ref("/").update({"gameState" : gameState})
  }));

  this.Play.html("Let's play!");
  this.Play.position(500,160);
  if(this.Play.mousePressed(function(){
    gameState = 5;
    database.ref("/").update({"gameState" : gameState})
  }));

  this.PlayInGarden.html("Let's play in park");
  this.PlayInGarden.position(585,160);
  if(this.PlayInGarden.mousePressed(function(){
    gameState = 6;
    database.ref("/").update({"gameState" : gameState})
  }));

    }
  }
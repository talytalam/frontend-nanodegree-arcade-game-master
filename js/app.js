// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += Math.random() * this.speed * dt;
    if (this.x > 800) 
    {
        this.x = -50;
        this.x += Math.random() * this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 305;
    this.y = 380;
};

//bind player on canvas
Player.prototype.update = function() {
    if (this.x < -1 || this.x > 700 || this.y > 420 || this.y < -40) {
        this.x = 305;
        this.y = 380;
    }
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

//handle input to control player
Player.prototype.handleInput = function(key) {

    switch (key) {
        case 'left': 
            this.x -= 100;
            break;
        case 'right':
            this.x += 100;
            break
        case 'up':
            this.y -= 80;
            break;
        case 'down':
            this.y += 80;
    }
};
Player.prototype.checkCollision = function() {
    for (var i=0;i < allEnemies.length;i++) {
        if (allEnemies[i].x < this.x + 50 && allEnemies[i].x + 50 > this.x && allEnemies[i].y < this.y + 40 && 40 + allEnemies[i].y > this.y) {
            this.x = 305;
            this.y = 380;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(10,63,80),new Enemy(30,145,100), new Enemy(300,227,100), new Enemy(210, 63, 470), new Enemy(150,145,380), new Enemy(130, 227, 570)];
var player = new Player;



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// data
var data = {
  view: 'mainMenu',
  x: 0,
  y: 0,
  speed: 3,
  userX: 0,
  userY: 0,
  userSpeed: 1,
  exitCar: false
};

var stateJSON = JSON.stringify(data);
var previousUserInput;
var previousUserInputJSON = localStorage.getItem('javascript-local-storage');
if (previousUserInputJSON !== null) {
  previousUserInput = JSON.parse(previousUserInputJSON);
  data.view = previousUserInput.view;
  data.speed = previousUserInput.speed;
}

document.addEventListener('DOMContentLoaded', function () {
  if (data.view === 'mainMenu') {
    mainMenu.style.display = 'flex';
    gameScreen.style.display = 'none';
  } else if (data.view === 'game') {
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
  }
});

// Main menu
var pick1 = document.getElementById('car1');
var pick2 = document.getElementById('car2');
var pick3 = document.getElementById('car3');
var carBox1 = document.getElementById('container1');
var carBox2 = document.getElementById('container2');
var carBox3 = document.getElementById('container3');
var mainMenu = document.getElementById('menu');
var gameScreen = document.getElementById('game');

document.addEventListener('click', function (event) {
  if (event.target === pick1 || event.target === carBox1) {
    data.x = 0;
    data.y = 0;
    car.setAttribute('src', 'images/truck.svg');
    data.speed = 5;
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
    data.view = 'game';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
    localStorage.getItem('javascript-local-storage');
  } else if (event.target === pick2 || event.target === carBox2) {
    data.x = 0;
    data.y = 0;
    car.setAttribute('src', 'images/customcar.svg');
    data.speed = 10;
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
    data.view = 'game';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
    localStorage.getItem('javascript-local-storage');
  } else if (event.target === pick3 || event.target === carBox3) {
    data.x = 0;
    data.y = 0;
    car.setAttribute('src', 'images/fastback.svg');
    data.speed = 15;
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
    data.view = 'game';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
    localStorage.getItem('javascript-local-storage');
  }
});

// game
document.addEventListener('keydown', handleDirection);
var car = document.getElementById('car');
var user = document.getElementById('user');

function handleDirection(event) {
  if (event.key === 'w') {
    car.className = 'north';
    user.className = 'north';
  } else if (event.key === 's') {
    car.className = 'south';
    user.className = 'south';
  } else if (event.key === 'd') {
    car.className = 'east';
    user.className = 'east';
  } else if (event.key === 'a') {
    car.className = 'west';
    user.className = 'west';
  }
}

var carEvent = {
  on: false
};
var userEvent = {
  on: false
};

function move() {
  if (car.className === 'east') {
    data.x = data.x + data.speed;
  } else if (car.className === 'south') {
    data.y = data.y + data.speed;
  } else if (car.className === 'west') {
    data.x = data.x - data.speed;
  } else if (car.className === 'north') {
    data.y = data.y - data.speed;
  }
  car.style.left = data.x + 'px';
  car.style.top = data.y + 'px';
}

function moveUser() {
  if (user.className === 'east') {
    data.userX = data.userX + data.userSpeed;
  } else if (user.className === 'south') {
    data.userY = data.userY + data.userSpeed;
  } else if (user.className === 'west') {
    data.userX = data.userX - data.userSpeed;
  } else if (user.className === 'north') {
    data.userY = data.userY - data.userSpeed;
  }
  user.style.left = data.userX + 'px';
  user.style.top = data.userX + 'px';
}

var interval;
var userInterval;
document.addEventListener('keydown', function (event) {
  if (event.key === 't') {
    carEvent.on = false;
    clearInterval(interval);
    data.exitCar = true;
  }
  if (data.exitCar === false) {
    if (event.code === 'Space' && carEvent.on === false) {
      interval = setInterval(function () {
        move();
      }, 14);

      carEvent.on = true;
    } else if (event.code === 'Space' && carEvent.on === true) {
      carEvent.on = false;
      clearInterval(interval);
    }
  }

  if (data.exitCar === true) {
    if (event.code === 'Space' && userEvent.on === false) {
      userInterval = setInterval(function () {
        moveUser();
      }, 14);

      carEvent.on = true;
    } else if (event.code === 'Space' && userEvent.on === true) {
      userEvent.on = false;
      clearInterval(userInterval);
    }
  } else if (event.code === 'KeyY') {
    mainMenu.style.display = 'flex';
    gameScreen.style.display = 'none';
    data.x = 0;
    data.y = 0;
    car.style.top = '0';
    car.style.left = '0';
    user.style.top = '0';
    user.style.left = '0';
    car.className = 'east';
    user.className = 'east';
    carEvent.on = false;
    clearInterval(interval);
    data.view = 'mainMenu';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
  }
});

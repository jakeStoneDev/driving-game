// data
var data = {
  view: 'mainMenu',
  x: 0,
  y: 0
};

var stateJSON = JSON.stringify(data);
var previousUserInput;
var previousUserInputJSON = localStorage.getItem('javascript-local-storage');
if (previousUserInputJSON !== null) {
  previousUserInput = JSON.parse(previousUserInputJSON);
  data.view = previousUserInput.view;
}

document.addEventListener('DOMContentLoaded', function () {
  if (data.view === 'mainMenu') {
    mainMenu.style.display = 'flex';
    gameScreen.style.display = 'none';
  }
  if (data.view === 'game') {
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
  }
});

// Main menu
var pick1 = document.getElementById('car1');
var pick2 = document.getElementById('car2');
var carBox1 = document.getElementById('container1');
var carBox2 = document.getElementById('container2');
var mainMenu = document.getElementById('menu');
var gameScreen = document.getElementById('game');

document.addEventListener('click', function (event) {
  if (event.target === pick1 || event.target === carBox1) {
    car = pick1;
    data.x = 0;
    data.y = 0;
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
    data.view = 'game';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
    location.reload();
  }
  if (event.target === pick2 || event.target === carBox2) {
    car = pick2;
    data.x = 0;
    data.y = 0;
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'flex';
    data.view = 'game';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
    location.reload();
  }
});

document.addEventListener('keydown', handleDirection);
var car = document.getElementById('car');
function handleDirection(event) {
  if (event.key === 'w') {
    car.className = 'north';
  }
  if (event.key === 's') {
    car.className = 'south';
  }
  if (event.key === 'd') {
    car.className = 'east';
  }
  if (event.key === 'a') {
    car.className = 'west';
  }
}

var carEvent = {
  on: false
};

function move() {
  if (car.className === 'east') {
    data.x = data.x + 3;
  }
  if (car.className === 'south') {
    data.y = data.y + 3;
  }
  if (car.className === 'west') {
    data.x = data.x - 3;
  }
  if (car.className === 'north') {
    data.y = data.y - 3;
  }
  car.style.left = data.x + 'px';
  car.style.top = data.y + 'px';
}

var interval;
document.addEventListener('keydown', function (event) {

  if (event.code === 'Space' && carEvent.on === false) {
    interval = setInterval(function () {
      move();
    }, 14);

    carEvent.on = true;
  } else if (event.code === 'Space' && carEvent.on === true) {
    carEvent.on = false;
    clearInterval(interval);
  }
  if (event.code === 'KeyY') {
    mainMenu.style.display = 'flex';
    gameScreen.style.display = 'none';
    data.view = 'mainMenu';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
  }
})
;

window.addEventListener('keydown', function () { if (event.keyCode === 32) { document.body.style.overflow = 'hidden'; } });
window.addEventListener('keyup', function () { if (event.keyCode === 32) { document.body.style.overflow = 'auto'; } });
// data
var data = {
  view: 'mainMenu',
  x: 0,
  y: 0,
  speed: 3,
  userX: 5,
  userY: 82,
  userSpeed: 1
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
    data.speed = 2;
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
    data.speed = 3;
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
    data.speed = 4;
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
  if (userEvent.active === true) {
    if (event.key === 'w') {
      user.className = 'north';
    } else if (event.key === 's') {
      user.className = 'south';
    } else if (event.key === 'd') {
      user.className = 'east';
    } else if (event.key === 'a') {
      user.className = 'west';
    }
  } else if (userEvent.active !== true) {
    if (event.key === 'w') {
      car.className = 'north';
    } else if (event.key === 's') {
      car.className = 'south';
    } else if (event.key === 'd') {
      car.className = 'east';
    } else if (event.key === 'a') {
      car.className = 'west';
    }
  }
}

var carEvent = {
  on: false
};
var userEvent = {
  on: false,
  active: false
};

function move() {
  if (data.x < 0) {
    data.x = 0;
    return false;
  }
  if (data.x > 1010) {
    data.x = 1010;
    return false;
  }
  if (data.y < 37) {
    data.y = 37;
    return false;
  }
  if (data.y > 667) {
    data.y = 667;
    return false;
  }
  if (data.y > 510 && data.x > 624) {
    if (userEvent.active === true) {
      if (data.userX > 816) {
        data.userX = 816;
        return false;
      }
    }
    if (userEvent.active !== true) {
      if (car.className === 'south') {
        car.className = 'north';
      }
      if (car.className === 'east') {
        car.className = 'west';
      }
    }
  }
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
  user.style.left = data.x + 90 + 'px';
  user.style.top = data.y + 5 + 'px';
  data.userX = data.x + 82;
  data.userY = data.y + 5;
  localStorage.setItem('javascript-local-storage', stateJSON);
}

function moveUser() {
  if (user.className === 'east') {
    data.userX = data.userX + data.userSpeed;
  }
  if (user.className === 'south') {
    data.userY = data.userY + data.userSpeed;
  }
  if (user.className === 'west') {
    data.userX = data.userX - data.userSpeed;
  }
  if (user.className === 'north') {
    data.userY = data.userY - data.userSpeed;
  }
  user.style.left = data.userX + 'px';
  user.style.top = data.userY + 'px';
  localStorage.setItem('javascript-local-storage', stateJSON);
}

var interval;
var userInterval;
document.addEventListener('keydown', function (event) {
  if (event.key === 't') {
    carEvent.on = false;
    clearInterval(interval);
    userEvent.active = true;
    if (car.className === 'east') {
      user.className = 'east';
      user.style.left = data.x + 90 + 'px';
      user.style.top = data.y - 35 + 'px';
      data.userX = data.x + 90;
      data.userY = data.y - 35;
    } else if (car.className === 'west') {
      user.className = 'west';
      user.style.left = data.x + 90 + 'px';
      user.style.top = data.y + 92 + 'px';
      data.userX = data.x + 92;
      data.userY = data.y - 35;
    } else if (car.className === 'north') {
      user.className = 'north';
      user.style.left = data.x + 17 + 'px';
      user.style.top = data.y + 18 + 'px';
      data.userX = data.x + 90;
      data.userY = data.y - 35;
    } else if (car.className === 'south') {
      user.className = 'south';
      user.style.left = data.x + 147 + 'px';
      user.style.top = data.y + 28 + 'px';
      data.userX = data.x + 147;
      data.userY = data.y + 28;
    }
    localStorage.setItem('javascript-local-storage', stateJSON);
  }

  if (userEvent.active === false) {
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
  if (userEvent.active === true) {
    user.style.visibility = 'visible';
    if (event.code === 'Space' && userEvent.on === false) {
      localStorage.getItem('javascript-local-storage');
      userInterval = setInterval(function () {
        moveUser();
      }, 14);
      userEvent.on = true;
    } else if (event.code === 'Space' && userEvent.on === true) {
      userEvent.on = false;
      clearInterval(userInterval);
    }
  }

  if (event.code === 'KeyY') {
    mainMenu.style.display = 'flex';
    gameScreen.style.display = 'none';
    data.x = 0;
    data.y = 0;
    data.userX = 5;
    data.userY = 83;
    user.style.visibility = 'hidden';
    car.style.top = '0';
    car.style.left = '0';
    user.style.top = '82';
    user.style.left = '5';
    car.className = 'east';
    user.className = 'east';
    carEvent.on = false;
    clearInterval(interval);
    userEvent.active = false;
    data.view = 'mainMenu';
    stateJSON = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', stateJSON);
    localStorage.getItem('javascript-local-storage');
  }
});

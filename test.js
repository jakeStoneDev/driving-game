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
  bulletX: 0,
  userSpeed: 1,
  remainingFuel: 157.5
};

var carBullet = document.getElementById('bullet');

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
  on: false,
  gunOn: false
};
var userEvent = {
  on: false,
  active: false,
  touchesCar: false
};

var fuelBar = document.getElementById('fuel-level');
var remainingFuel = data.remainingFuel;

function fuelLevel() {
  localStorage.getItem('javascript-local-storage');
  fuelBar.style.width = remainingFuel;
}

function move() {
  if (data.remainingFuel === 0) {
    fuelBar.style.width = '0';
    carEvent.on = false;
    clearInterval(interval);
    return false;
  } else if (data.x < 0) {
    data.x = 0;
    return false;
  } else if (data.x > 1010) {
    data.x = 1010;
    return false;
  } else if (data.y < 37) {
    data.y = 37;
    return false;
  } else if (data.y > 667) {
    data.y = 667;
    return false;
  } else if (data.y > 510 && data.x > 624) {
    if (userEvent.active === true) {
      if (data.userX > 816) {
        data.userX = 816;
        return false;
      }
    }
    if (userEvent.active !== true) {
      if (car.className === 'south') {
        return false;
      }
      if (car.className === 'east') {
        return false;
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
  data.remainingFuel = data.remainingFuel - 0.1;
  fuelBar.style.width = data.remainingFuel + 'px';
  car.style.left = data.x + 'px';
  car.style.top = data.y + 'px';
  user.style.left = data.x + 90 + 'px';
  user.style.top = data.y + 5 + 'px';
  data.userX = data.x + 82;
  data.userY = data.y + 5;
  data.bulletX = data.x + 85;
  carBullet.style.top = data.y + 47 + 'px';
  carBullet.style.left = data.x + 148 + 'px';
  localStorage.setItem('javascript-local-storage', stateJSON);
  fuelLevel();
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

function exitCar() {
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

/*
var gunInterval;
document.addEventListener('keydown', function (event) {
  if (event.key === 'x' || carEvent.fireGun === true) {
    clearInterval(gunInterval);
    carEvent.fireGun = false;
  } else if (event.key === 'x' || carEvent.fireGun === false) {
    carEvent.fireGun = true;
    gunInterval = setInterval(function () {
      fireGun();
    }, 20);
  }
});

/*
function fireGun() {
  carBullet.style.visibility = 'visible';
  if (data.bulletX > 1200) {
    data.bulletX = data.x + 95;
  }
  data.bulletX = data.bulletX + 20;
  carBullet.style.left = data.bulletX + 'px';
}
*/

var interval;
var userInterval;
document.addEventListener('keydown', function (event) {
  if (event.key === 't') {
    carEvent.on = false;
    clearInterval(interval);
    userEvent.active = true;
    if (userEvent.touchesCar === true) {
      userEvent.active = false;
      carEvent.on = true;
      userEvent.touchesCar = false;
      userEvent.active = false;
      clearInterval(userInterval);
      data.userX = data.x + 5;
      data.userY = data.y + 82;
    } else {
      return false;
    }
    exitCar();
  }

  if (userEvent.active === false) {
    if (event.code === 'Space' && carEvent.on === false) {
      localStorage.getItem('javascript-local-storage');
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

      userInterval = setInterval(function () {
        moveUser();
      }, 14);
      userEvent.on = true;
    } else if (event.code === 'Space' && userEvent.on === true) {
      userEvent.on = false;
      clearInterval(userInterval);
    }
  }

  var carProximity = {
    x1: data.x,
    y1: data.y,
    x2: data.x + 200,
    y2: data.y + 100
  };
  var userProximity = {
    x1: data.userX,
    y1: data.userY,
    x2: data.userX + 50,
    y2: data.userX + 50
  };
  // Check if rectangle a touches rectangle b
  // Each object (a and b) should have 2 properties to represent the
  // top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
  function touches(a, b) {
    // has horizontal gap
    if (a.x1 > b.x2 || b.x1 > a.x2) return false;

    // has vertical gap
    if (a.y1 > b.y2 || b.y1 > a.y2) return false;
    if (userEvent.active === true) {
      userEvent.touchesCar = true;
    }
    return true;
  }
  touches(carProximity, userProximity);

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

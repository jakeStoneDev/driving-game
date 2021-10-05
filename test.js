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

var x = 0;
var y = 0;

var carEvent = {
  on: false
};

function move() {
  if (car.className === 'east') {
    x = x + 3;
  }
  if (car.className === 'south') {
    y = y + 3;
  }
  if (car.className === 'west') {
    x = x - 3;
  }
  if (car.className === 'north') {
    y = y - 3;
  }
  car.style.left = x + 'px';
  car.style.top = y + 'px';
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
})
;

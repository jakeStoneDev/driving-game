document.addEventListener('keydown', handleKeydown);
var car = document.getElementById('car');
var carEvent = {
  on: false,
  off: true,
  direction: 'east'
};

var x = 0;
var y = 0;

function handleKeydown(event) {

  if (event.key === 'w' || event.key === 'ArrowUp') {
    car.className = 'north';
  }
  if (event.key === 's' || event.key === 'ArrowDown') {
    car.className = 'south';
  }
  if (event.key === 'd' || event.key === 'ArrowRight') {
    car.className = 'east';
  }
  if (event.key === 'a' || event.key === 'ArrowLeft') {
    car.className = 'west';
  }
}

if (carEvent.on === true) {
  setInterval(16, move);
}

function move() {
  car.style.left = x + 'px';
  car.style.top = y + 'px';
  if (carEvent.direction === 'east') {
    x = x + 1;
  }
  if (carEvent.direction === 'west') {
    x = x - 1;
  }
  if (carEvent.direction === 'north') {
    x = x + 1;
  }
  if (carEvent.direction === 'south') {
    x = x - 1;
  }
}

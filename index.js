let captured = false; // Флаг, указывающий на то, что мы зажали левую кнопку мыши на контроле.
let mouseAngle = 0;
let rotateAngle;

let move = false;

let coordX;
let coordY;

document.addEventListener('mousedown', function(event) {
  let div = document.querySelector('.Container');
  let blockData = div.getBoundingClientRect();
  coordX = event.x - blockData.x;
  coordY = event.y - blockData.y;

  switch (event.target.className) {
    case 'indicator in1':
      rotateAngle = 225;
      break;
    case 'indicator in2':
      rotateAngle = 315;
      break;
    case 'indicator in3':
      rotateAngle = 45;
      break;
    case 'indicator in4':
      rotateAngle = 135;
      break;
    case 'Container':
      move = true;
      break;
    default:
      return;
  }

  if (rotateAngle) {
    captured = true;
    mouseAngle = getMouseAngle(event, rotateAngle);
    document.querySelector('body').classList.add('custom-cursor');
  }

  if (move) {
    moveElement(event);
    document.querySelector('.Container').classList.add('cursor-grab');
  }
});

// В этом методе считается угол по положению курсора мыши.
const getMouseAngle = (event, rotateAngle) => {
  let div = document.querySelector('.Container');
  let blockData = div.getBoundingClientRect();

  let centerX = blockData.left + blockData.width / 2;
  let centerY = blockData.top + blockData.height / 2;

  let mouseLeft = event.x - centerX + 0.1;
  let mouseTop = event.y - centerY;

  let angle = (Math.atan(mouseTop / mouseLeft) * 180) / Math.PI;

  if (mouseLeft < 0) angle += 180;
  if (angle < 0) angle += 360;

  let calcAngle = Math.abs(angle + 360 - rotateAngle);
  if (calcAngle > 360) calcAngle -= 360;

  return calcAngle;
};

const moveElement = event => {
  document.querySelector('.Container').style.left = event.x - coordX + 'px';
  document.querySelector('.Container').style.top = event.y - coordY + 'px';
};

document.addEventListener('mousemove', function(event) {
  if (captured) {
    let rotateDeg = getMouseAngle(event, rotateAngle);
    document.querySelector('.Container').style.transform =
      'rotate(' + rotateDeg + 'deg)';
  }
  if (move) moveElement(event);
});

document.addEventListener('mouseup', function(event) {
  if (captured) {
    captured = false;
    rotateAngle = undefined;
    document.querySelector('body').classList.remove('custom-cursor');
  }

  if (move) {
    move = false;
    document.querySelector('.Container').classList.remove('cursor-grab');
  }
});

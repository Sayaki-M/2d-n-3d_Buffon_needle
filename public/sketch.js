const GRID_SIZE=60;
const CANVAS_SIZE=GRID_SIZE * 7;

function init(){
  background(0);
  stroke(127);
  for(let i = 0; i < CANVAS_SIZE / GRID_SIZE; i++){
    var a = i * GRID_SIZE + GRID_SIZE / 2;
    line(0, a, CANVAS_SIZE, a);
    line(a, 0, a, CANVAS_SIZE);
  }
  needle = 0;
  needleMax = document.props.number.value;
  onneedle = 0;
  offneedle = 0;
  needlesize = document.props.length.value;
  if(document.props.speed.value=="quick"){
    draw2();
  }else{
    ongoing=true;
  }
}

function setup(){
  let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  canvas.parent('canvas');
  document.getElementById('rate').innerHTML = '-';
  document.getElementById('length').innerHTML = GRID_SIZE;
  init();
}

function draw() {
  ongoing = (needle != needleMax && needle < Number.MAX_SAFE_INTEGER);
  if(ongoing){
    var x1 = Math.random() * CANVAS_SIZE;
    var y1 = Math.random() * CANVAS_SIZE;
    var rad = Math.random() * 2 * Math.PI;
    var x2 = x1 + needlesize * Math.cos(rad);
    var y2 = y1 + needlesize * Math.sin(rad);
    if((Math.floor(x1 / GRID_SIZE + 1 / 2) != Math.floor(x2 / GRID_SIZE + 1 / 2))
      || (Math.floor(y1 / GRID_SIZE + 1 / 2) != Math.floor(y2 / GRID_SIZE + 1 / 2))){
      stroke(200, 0, 0);
      onneedle++;
    }else{
      stroke(0, 200, 0);
      offneedle++;
    }
    line(x1, y1, x2, y2);
    needle++;
    document.getElementById('rate').innerHTML = '-';
  }else{
    document.getElementById('rate').innerHTML = needle == 0 ? 0 : onneedle / needle;
  }
  document.getElementById('allneedle').innerHTML = needle;
  document.getElementById('onneedle').innerHTML = onneedle;
  document.getElementById('offneedle').innerHTML = offneedle;
}

function draw2() {
  needleMax = (needleMax < Number.MAX_SAFE_INTEGER) ? needleMax : Number.MAX_SAFE_INTEGER;
  for(var i=0; i<needleMax;i++){
    var x1 = Math.random() * CANVAS_SIZE;
    var y1 = Math.random() * CANVAS_SIZE;
    var rad = Math.random() * 2 * Math.PI;
    var x2 = x1 + needlesize * Math.cos(rad);
    var y2 = y1 + needlesize * Math.sin(rad);
    if((Math.floor(x1 / GRID_SIZE + 1 / 2) != Math.floor(x2 / GRID_SIZE + 1 / 2))
      || (Math.floor(y1 / GRID_SIZE + 1 / 2) != Math.floor(y2 / GRID_SIZE + 1 / 2))){
      stroke(200, 0, 0);
      onneedle++;
    }else{
      stroke(0, 200, 0);
      offneedle++;
    }
    line(x1, y1, x2, y2);
    needle++;
  }
}

const GRID_SIZE = 48;
const CUBE_SIZE =GRID_SIZE * 6;
const CANVAS_SIZE = 420;
const ANGLE = Math.PI/180 * 6;
const COS_A = Math.cos(ANGLE);
const SIN_A = Math.sin(ANGLE);
const YTURN = [COS_A, 0, SIN_A, 0, 1, 0, -SIN_A, 0, COS_A];
const XTURN = [1, 0, 0, 0, COS_A, SIN_A, 0, -SIN_A, COS_A];
let needle = 0;
let needles = [];
let needleMax = 100;
let onneedle = 0;
let offneedle = 0;
let needlesize = 12;
let matrix=[1,0,0,0,1,0,0,0,1];
let clicked=0;

function init(){
  needle = 0;
  needles=[];
  needleMax = document.props.number.value;
  onneedle = 0;
  offneedle = 0;
  needlesize = document.props.length.value;
  matrix=[1,0,0,0,1,0,0,0,1];
  clicked = 0;
  if(document.props.speed.value=="loose"){
    ongoing=true;
  }else{
    draw2();
  }
}

function setup(){
  let canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE, WEBGL);
  canvas.parent('canvas');
  document.getElementById('rate').innerHTML = '-';
  document.getElementById('length').innerHTML = GRID_SIZE;
  frameRate(10);
  init();
}

function draw(){
  background(0);
  applyMatrix(
    matrix[0], matrix[1], matrix[2], 0,
    matrix[3], matrix[4], matrix[5], 0,
    matrix[6], matrix[7], matrix[8], 0,
    0, 0, 0, 1
  );
  stroke(127);
  for(var i = GRID_SIZE / 2 ; i < CUBE_SIZE; i += GRID_SIZE){
    var a = i - CUBE_SIZE / 2;
    for(var j = GRID_SIZE / 2 ; j < CUBE_SIZE; j += GRID_SIZE){
      var b = j - CUBE_SIZE / 2;
      line(a, b, -CUBE_SIZE / 2, a, b, CUBE_SIZE / 2);
      line(a, -CUBE_SIZE / 2, b, a, CUBE_SIZE / 2, b);
      line(-CUBE_SIZE / 2, a, b, CUBE_SIZE / 2, a, b);
    }
  }
  ongoing = (needle != needleMax && needle < 1001);
  if(ongoing){
    makepin();
    document.getElementById('rate').innerHTML = '-';
  }else{
    document.getElementById('rate').innerHTML = needle == 0 ? 0 : onneedle / needle;
  }
  drawpin();
  document.getElementById('allneedle').innerHTML = needle;
  document.getElementById('onneedle').innerHTML = onneedle;
  document.getElementById('offneedle').innerHTML = offneedle;
  if(clicked==1){
    multimatrix(matrix, YTURN);
  }else if (clicked==3) {
    multimatrix(matrix, XTURN);
  }
}

function draw2() {
  needleMax = (needleMax < 1001) ? needleMax : 1000;
  for(var i = 0; i < needleMax; i++){
    makepin(needlesize);
  }
}

function mouseClicked(){
  clicked = (clicked + 1) % 4;
}

function makepin() {
  var x1 = (Math.random() - 1 / 2) * (CUBE_SIZE - GRID_SIZE * 2);
  var y1 = (Math.random() - 1 / 2) * (CUBE_SIZE - GRID_SIZE * 2);
  var z1 = (Math.random() - 1 / 2) * (CUBE_SIZE - GRID_SIZE * 2);
  var rad1 = Math.random() * 2 * Math.PI;
  var rad2 = Math.random() * 2 * Math.PI;
  var x2 = x1 + needlesize * Math.cos(rad1) * Math.cos(rad2);
  var y2 = y1 + needlesize * Math.sin(rad1) * Math.cos(rad2);
  var z2 = z1 + needlesize * Math.sin(rad2);
  if((Math.floor(x1 / GRID_SIZE + 1 / 2) != Math.floor(x2 / GRID_SIZE + 1 / 2))
    || (Math.floor(y1 / GRID_SIZE + 1 / 2) != Math.floor(y2 / GRID_SIZE + 1 / 2))
    || (Math.floor(z1 / GRID_SIZE + 1 / 2) != Math.floor(z2 / GRID_SIZE + 1 / 2))
  ){
    onneedle++;
  }else{
    offneedle++;
  }
  needle++;
  needles.push({
    x1: x1,
    y1: y1,
    z1: z1,
    x2: x2,
    y2: y2,
    z2: z2,
  });
}

function drawpin(){
  needles.forEach(props => {
    if((Math.floor(props.x1 / GRID_SIZE + 1 / 2) != Math.floor(props.x2 / GRID_SIZE + 1 / 2))
      || (Math.floor(props.y1 / GRID_SIZE + 1 / 2) != Math.floor(props.y2 / GRID_SIZE + 1 / 2))
      || (Math.floor(props.z1 / GRID_SIZE + 1 / 2) != Math.floor(props.z2 / GRID_SIZE + 1 / 2))
    ){
      stroke(200, 0, 0);
    }else{
      stroke(0, 200, 0);
    }
    line(props.x1, props.y1, props.z1, props.x2, props.y2, props.z2);
  });
}

function multimatrix(matrix1,matrix2){ //[matrix2][matrix1]
  var matrix3=[0,0,0,0,0,0,0,0,0];
  for(var i = 0; i < 9 ; i++){
    for(var j = 0; j < 3 ; j++){
      matrix3[i] += matrix1[j * 3 + i % 3] * matrix2[3 * Math.floor(i / 3) + j];
    }
  }
  for(var i = 0; i < 9 ; i++){
    matrix1[i]=matrix3[i];
  }
}

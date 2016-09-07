var socket;
var ellipseXSize = 16;
var ellipseYSize = 16;
var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  //var y = (windowHeight - height) / 3;
  cnv.position(x);
}


function setup () {
  cnv = createCanvas(1000, 800);
  cnv.parent('sketch-holder');
  centerCanvas();
  background(51);

  socket = io.connect('86.5.155.121:3000');
  socket.on('mouse', newDrawing);

}

function windowResized() {
  centerCanvas();
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, data.ex, data.ey);


  triangle(1230, 1275, 1258, 1220, 1286, 1275).addEventListener("click", sizeupTri);
}

function mouseDragged() {
  console.log('Sending' + mouseX + ',' + mouseY + 'Size x:' + this.ellipseXSize + ' y: ' + this.ellipseYSize);

  var data = {
    x: mouseX,
    y: mouseY,
    ex: ellipseXSize,
    ey: ellipseYSize
  }

  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, this.ellipseXSize, this.ellipseYSize);
}

function sizeUp() {
  ellipseXSize++;
  ellipseYSize++;
  console.log("Size: " + ellipseXSize + " x and " + ellipseYSize + " y")
}

function sizeDown() {
  ellipseXSize--;
  ellipseYSize--;
  if (ellipseYSize < 1) {
    ellipseYSize = 1;
  }
  if (ellipseXSize < 1) {
    ellipseXSize = 1;
  }
  console.log("Size: " + ellipseXSize + " x and " + ellipseYSize + " y")
}
function draw() {


}

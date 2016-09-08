var socket;
var ellipseXSize = 16;
var ellipseYSize = 16;
var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  //var y = (windowHeight - height) / 3;
  cnv.position(x);
}


function setup() {
  cnv = createCanvas(1000, 800);
  cnv.parent('sketch-holder');
  centerCanvas();
  background(51);

  socket = io.connect('86.5.155.121:3000');
  //socket = io.connect('localhost:3000');
  socket.on('mouse', newDrawing);

  document.getElementById("brushSize").innerHTML = (ellipseXSize);

}

function draw() {

}

function windowResized() {
  centerCanvas();
}

function newDrawing(data) {
  noStroke();
  fill(255, 0, 100);
  ellipse(data.x, data.y, data.ex, data.ey);
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
  document.getElementById("brushSize").innerHTML = (ellipseXSize);
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

  document.getElementById("brushSize").innerHTML = (ellipseXSize);
}

function clearCanvas() {
  clear();
  background(51);
}

function chatSend() {
  //$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    if ($('#m').val('')) {
      return false;
    }
    else {
      socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
      });
    }
  //});


}

let seen, p, placementsX, timer, placementsY, sizes
var pieces = []
var score
function setup() {
  var canvas = createCanvas(400, 600);
  canvas.parent("#canvas-parent")
  init()
}

function init() {
  clearInterval(timer)
score = 0
document.getElementById('score').innerText ="Score : "+ score

  pieces.push(Math.floor(Math.random() * pattern.indices.length))
  pieces.push(Math.floor(Math.random() * pattern.indices.length))
  pieces.push(Math.floor(Math.random() * pattern.indices.length))
  pieces.push(Math.floor(Math.random() * pattern.indices.length))
  pieces.push(Math.floor(Math.random() * pattern.indices.length))

  p = []
  placementsX = []
  placementsY = []
  seen = {}
  sizes = 20
  seen[width - sizes] = []
  seen[width - sizes].push(200)
  generateGrid()
  newPiece()
  timer = setInterval(function () {
    p[p.length - 1].fall()
    if (p[p.length - 1].y <= sizes)
      init()
  }, 200)
}

function draw() {
  background(51);
  drawGrid()

  for (var i = 0; i < p.length; i++) {

    p[i].show()
    if (p[p.length - 1].isStationnary()) {
      newPiece()
      clearRow()
    }
  }
}

function keyPressed() {
  if (key == "ArrowUp" && !p[p.length - 1].isStationnary()) {
    if (p[p.length - 1].checkXAxis(1) && p[p.length - 1].checkXAxis(-1) && p[p.length - 1].checkYAxis())
      p[p.length - 1].rotate()
  }
  if (key == "ArrowRight" && !p[p.length - 1].isStationnary()) {
    if (p[p.length - 1].checkXAxis(1))
      p[p.length - 1].move(1, 0)
  }
  if (key == "ArrowLeft" && !p[p.length - 1].isStationnary() && p[p.length - 1].x > 0) {
    if (p[p.length - 1].checkXAxis(-1))
      p[p.length - 1].move(-1, 0)
  }
  if (key == "ArrowDown" && !p[p.length - 1].isStationnary() && p[p.length - 1].y < height - 60) {
    if (p[p.length - 1].checkYAxis())
      p[p.length - 1].move(0, 1)

  }
  p[p.length - 1].updatePos()
}

function newPiece() {
  var x = placementsX[10]
  var y = placementsY[1]
  p.push(new Square(x, y, pieces[0]))
  pieces.shift()
  pieces.push(Math.floor(Math.random() * pattern.indices.length))
  updatePrevisualization()
}

function generateGrid() {
  for (var i = 0; i < width / sizes; i++) {
    placementsX.push(i * sizes)
    seen[i * sizes] = []
  }
  for (var i = 0; i < height / sizes; i++) {
    placementsY.push(i * sizes)
    seen[i * sizes] = []
  }
}

function drawGrid() {

  for (var i = 0; i < height / sizes; i++) {

    for (var j = 0; j < width / sizes; j++) {
      fill(0)
      stroke(51)
      rect(j * sizes, i * sizes, sizes, sizes)
    }
  }

}
function clearRow() {
  for (var i = Object.keys(seen).length - 1; i > 0; i--) {
    var ligne
    if (seen[Object.keys(seen)[i]].length >= width / sizes) {
      score++
      document.getElementById('score').innerText ="Score : "+score
      for (var j = 0; j < p.length; j++) {
        p[j].deleteRow(Object.keys(seen)[i])
        ligne = i

      }
      seen[Object.keys(seen)[i]] = []
      for (var k = i; k > 0; k--) {
        if (seen[Object.keys(seen)[k - 1]].length != 0) {
          seen[Object.keys(seen)[k]] = seen[Object.keys(seen)[k - 1]]
        } else {
          seen[Object.keys(seen)[k]] = []
          break;
        }
      }
    }
  }

}
function updatePrevisualization() {

  var i = 0
  Array.prototype.slice.call( document.getElementsByClassName('next-pieces')[0].children).forEach(element => {
    element.style.backgroundImage = "url('img/" + pieces[i] + ".png')"
    i++
  });

}
let Square = function (x, y, shape) {
  this.x = x
  this.y = y
  this.stationary = false
  this.components = []
  this.longueur = 0
  this.rand = Math.random()
  this.pattern = shape
  this.c = pattern.colors[this.pattern]
  for (var i = 0; i < pattern.indices[this.pattern][this.longueur].length; i++)
    this.components.push([this.x + (sizes * pattern.indices[this.pattern][this.longueur][i][0]), this.y + (sizes * pattern.indices[this.pattern][this.longueur][i][1])])
}
Square.prototype.show = function () {
  fill(this.c)
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i][0] != undefined && this.components[i][1] != undefined && this.components[i].length != 0)
      rect(this.components[i][0], this.components[i][1], sizes, sizes)
  }
}
Square.prototype.updatePos = function () {

  this.components = []
  for (var i = 0; i < pattern.indices[this.pattern][this.longueur].length; i++)
    this.components.push([this.x + (sizes * pattern.indices[this.pattern][this.longueur][i][0]), this.y + (sizes * pattern.indices[this.pattern][this.longueur][i][1])])
}

Square.prototype.fall = function () {

  if (this.stationary)
    return

  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i][1] >= height - sizes) {
      this.stationary = true
      for (var p = 0; p < this.components.length; p++) {
        seen[this.components[p][1]].push(this.components[p][0])
      }
      return
    }
  }
  for (var j = this.components.length - 1; j >= 0; j--) {

    for (var i = 0; i < seen[this.components[j][1] + sizes].length; i++) {

      if (seen[this.components[j][1] + sizes][i] == this.components[j][0]) {
        this.stationary = true
        this.components.forEach(element => {
          seen[element[1]].push(element[0])

        });
        return
      }
    }
  }
  this.y += sizes

  var i = 0
  this.components.forEach(element => {
    element[1] = this.y + (sizes * pattern.indices[this.pattern][this.longueur][i][1])
    i++
  });
}
Square.prototype.checkXAxis = function (dir) {

  for (var i = 0; i < this.components.length; i++) {
    if ((seen[this.components[i][1]].length != 0 && seen[this.components[i][1]].indexOf(this.components[i][0] + (sizes * dir)) != -1) || (this.components[i][0] + (sizes * dir) >= width)) {
      return false
    }
  }
  return true
}
Square.prototype.checkYAxis = function () {

  for (var i = 0; i < this.components.length; i++) {
    if (seen[this.components[i][1] + sizes] == undefined)
      return false
    if ((seen[this.components[i][1] + sizes].length != 0 && seen[this.components[i][1] + (sizes)].indexOf(this.components[i][0]) != -1) || ((this.components[i][1] + sizes >= height))) {
      return false
    }
  }
  return true
}
Square.prototype.move = function (x, y) {
  this.x += sizes * x
  this.y += sizes * y
}
Square.prototype.rotate = function () {
  if (this.longueur == pattern.indices[this.pattern].length - 1)
    this.longueur = 0
  else
    this.longueur++
}
Square.prototype.deleteRow = function (row) {
  for (var i = 0; i < this.components.length; i++) {
    if (this.components[i][1] == parseInt(row)) {
      this.components[i] = []

    } else {
      if (this.components[i][1] != height - sizes && this.components[i][1] <= row)
        this.components[i][1] += sizes

    }
  }
}
Square.prototype.isStationnary = function () {
  return this.stationary
}
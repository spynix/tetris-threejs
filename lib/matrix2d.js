/*    File: matrix2d.js
 *  Author: Jin Savage ("spynix")
 *  
 *  
 * Notes:
 * ----------------------------------------------------------------------------
 * 
 * These are general purpose classes for handling common matrix tasks.
 * 
 * And camel case sucks.
 * 
 * 
 *  
 * 
 * License - 2-clause ("simplified") BSD
 * ----------------------------------------------------------------------------
 * 
 * Copyright (c) 2015, Jin Savage ("spynix")
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/* Matrix2d():
 *   creates a 2d matrix of size (m * n)
 *   
 *   the matrix itself is initially zeroed out
 *   m = max(1, m);
 *   n = max(1, n);
 */
function Matrix2d(m, n, debug) {
  var i, j;
  
  this.debug = ((debug === undefined) ? false : debug);
  this.matrix = [];
  this.num_rows = ((m <= 0) ? 1 : m);
  this.num_columns = ((n <= 0) ? 1 : n);
  
  for (i = 0; i < m; i++)
    for (j = 0; j < n; j++)
      this.matrix.push(0);
}


/* update():
 *   update will simply try to change the data stored in the matrix while
 *   complying with the matrix's current dimensions.  again, data can be either
 *   a 1 or 2 dimensional array
 */
Matrix2d.prototype.update = function(data) {
  var temp = [];
  var i, j, k, l, type;
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->update(): input not an array");
      
    return false;
  }
  
  type = Object.prototype.toString.call(data[0]);
  
  if (type === "[object Array]") { /* first element array? so we assume 2d array */
    if (data.length != this.num_rows) {
      if (this.debug)
        console.log("Matrix2d->update(): 2d input expected (" + this.num_rows.toString() + ") rows -- (found " + data.length.toString() + " rows)");
      
      return false;
    }
    
    for (i = 0, j = data.length; i < j; i++) {
      if (data[i].length != this.num_columns) {
        if (this.debug)
          console.log("Matrix2d->update(): 2d input expected (" + this.num_rows.toString() + ") columns -- (found " + data[i].length.toString() + " at row " + i.toString() + ")");

        return false;
      }
      
      for (k = 0, l = data[i].length; k < l; k++)
        temp.push(data[i][k]);
    }
    
    if (temp.length != (this.num_rows * this.num_columns)) {
      if (this.debug)
        console.log("Matrix2d->update(): 2d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else if (type === "[object Number]") { /* first element number? so we assume 1d array */
    if ((l = data.length) != (this.num_rows * this.num_columns)) {
      if (this.debug)
        console.log("Matrix2d->update(): 1d data expected (" + (this.num_rows * this.num_columns).toString() + "elements -- (found " + l.toString() + ")");
      
      return false;
    }
    
    for (i = 0; i < l; i++)
      temp.push(data[i]);
    
    if (temp.length != (this.num_rows * this.num_columns)) {
      if (this.debug)
        console.log("Matrix2d->update(): 1d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else { /* first element something else?  you fucked up */
    if (this.debug)
      console.log("Matrix2d->update(): input expected Array or Number -- (found " + type + ")");
    
    return false;
  }
  
  /* our validation is successful at this point, so assign it */
  this.matrix = temp;
};


/* set():
 *   set overwrites the matrix with all new data
 *   
 *   data can be either a two dimensional array, or a 1 dimensional array
 */
Matrix2d.prototype.set = function(m, n, data) {
  var i, j, k, l, type;
  var temp = [];
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->set(): data not an array");
      
    return false;
  }
  
  if (m <= 0) {
    if (this.debug)
      console.log("Matrix2d->set(): number of rows must be > 0 -- (received " + m.toString() + ")");
    
    return false;
  } else if (n <= 0) {
    if (this.debug)
      console.log("Matrix2d->set(): number of columns must be > 0 -- (received " + n.toString() + ")");
    
    return false;
  }
  
  type = Object.prototype.toString.call(data[0]);
  
  if (type === "[object Array]") { /* first element array? so we assume 2d array */
    if (data.length != m) {
      if (this.debug)
        console.log("Matrix2d->set(): 2d input expected (" + m.toString() + ") rows -- (found " + data.length.toString() + " rows)");
      
      return false;
    }
    
    for (i = 0, j = data.length; i < j; i++) {
      if (data[i].length != n) {
        if (this.debug)
          console.log("Matrix2d->set(): 2d input expected (" + n.toString() + ") columns -- (found " + data[i].length.toString() + " at row " + i.toString() + ")");

        return false;
      }
      
      for (k = 0, l = data[i].length; k < l; k++)
        temp.push(data[i][k]);
    }
    
    if (temp.length != (m * n)) {
      if (this.debug)
        console.log("Matrix2d->set(): 2d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else if (type === "[object Number]") { /* first element number? so we assume 1d array */
    if ((l = data.length) != (m * n)) {
      if (this.debug)
        console.log("Matrix2d->set(): 1d data expected (" + (m * n).toString() + "elements -- (found " + l.toString() + ")");
      
      return false;
    }
    
    for (i = 0; i < l; i++)
      temp.push(data[i]);
    
    if (temp.length != (m * n)) {
      if (this.debug)
        console.log("Matrix2d->set(): 1d data successfully handled yet did not result in the correct number of total elements");
      
      return false;
    }
  } else { /* first element something else?  you fucked up */
    if (this.debug)
      console.log("Matrix2d->set(): input expected Array or Number -- (found " + type + ")");
    
    return false;
  }
  
  this.num_rows = m;
  this.num_columns = n;
  this.matrix = temp;
};


/* set_row():
 *   set a row's data 
 */
Matrix2d.prototype.set_row = function(index, data) {
  var i, j, k, l;
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->set_row(): row parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_rows) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->set_row(): expected range of (0 - " + (this.num_rows - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->set_row(): input not an array");
      
    return false;
  }
  
  if (data.length != this.num_columns) {
    if (this.debug)
      console.log("Matrix2d->set_row(): input array not correct size (expected " + this.num_columns.toString() + ") -- (received " + data.length.toString() + ")");
    
    return false;
  }
  
  for (i = (index * this.num_columns), j = ((index + 1) * this.num_columns), k = 0, l = data.length; (i < j) && (k < l); i++, k++)
    this.matrix[i] = data[k];
  
  return true;
};


/* set_column():
 *   set a row's data 
 */
Matrix2d.prototype.set_column = function(index, data) {
  var i, j, k, l;
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->set_column(): row parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_columns) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->set_column(): expected range of (0 - " + (this.num_columns - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  if (Object.prototype.toString.call(data) !== "[object Array]") {
    if (this.debug)
      console.log("Matrix2d->set_column(): input not an array");
      
    return false;
  }
  
  if (data.length != this.num_rows) {
    if (this.debug)
      console.log("Matrix2d->set_column(): input array not correct size (expected " + this.num_rows.toString() + ") -- (received " + data.length.toString() + ")");
    
    return false;
  }
  
  for (i = index, j = (this.num_rows * this.num_columns), k = 0, l = data.length; (i < j) && (k < l); i += this.num_columns, k++)
    this.matrix[i] = data[k];
  
  return true;
};


/* set_element():
 *   sets the element at row x column
 */
Matrix2d.prototype.set_element = function(row, column, data) {
  if ((row === undefined) || (column === undefined)) {
    if (this.debug)
      console.log("Matrix2d->set_element(): row(" + row.toString() + "), column(" + column.toString() + ")");
    
    return false;
  }
  
  if (data === undefined) {
    if (this.debug)
      console.log("Matrix2d->set_element(): input undefined");
    
    return false;
  } 
  
  if ((row < 0) || (row > (this.num_rows - 1)) || (column < 0) || (column > this.num_columns - 1)) {
    if (this.debug)
      console.log("Matrix2d->set_element(): index out of range; expected ((0 - " + (this.num_rows - 1).toString() + "), (0 - " + (this.num_columns - 1).toString() + ") -- received (" + row.toString() + ", " + column.toString() + ")");
    
    return false;
  }
  
  this.matrix[(row * this.num_columns) + column] = data;
  
  return true;
};


/* get():
 *   retrieve the data stored in the matrix
 *   
 *   dimension refers to the dimensionality of the return value.
 *     1 = 1 dimensional array
 *     2 = array of 1 dimensional arrays (ie 2 dimensional array)
 */
Matrix2d.prototype.get = function(dimension) {
  var i, j, row;
  var rows = [];
  
  if (dimension === undefined)
    dimension = 1;
  
  if (dimension == 1) {
    return this.matrix;
  } else if (dimension == 2) {
    for (i = 0; i < this.num_rows; i++) {
      row = [];
      
      for (j = 0; j < this.num_columns; j++)
        row.push(this.matrix[(i * this.num_columns) + j]);
      
      rows.push(row);
    }
    
    return rows;
  } else {
    if (this.debug)
      console.log("Matrix2d->get(): invalid retrieval dimensionality");
    
    return false;
  }
  
  return false;
};


/* get_row():
 *   retrieve the specified row by index
 */
Matrix2d.prototype.get_row = function(index) {
  var i, j;
  var temp = [];
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->get_row(): row parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_rows) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->get_row(): expected range of (0 - " + (this.num_rows - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  for (i = (index * this.num_columns), j = ((index + 1) * this.num_columns); i < j; i++)
    temp.push(this.matrix[i]);
  
  return temp;
};


/* get_column():
 *   retrieve the specified column by index
 * 
 */
Matrix2d.prototype.get_column = function(index) {
  var i, j;
  var temp = [];
  
  if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->get_column(): column parameter was undefined");
    
    return false;
  }
  
  if ((index >= this.num_columns) || (index < 0)) {
    if (this.debug)
      console.log("Matrix2d->get_column(): expected range of (0 - " + (this.num_columns - 1).toString() + ") -- (received " + index.toString() + ")");
    
    return false;
  }
  
  for (i = index, j = (this.num_rows * this.num_columns); i < j; i += this.num_columns)
    temp.push(this.matrix[i]);
  
  return temp;
};


/* get_element():
 *   retrieves the element at row x column
 */
Matrix2d.prototype.get_element = function(row, column) {
  if ((row === undefined) || (column === undefined)) {
    if (this.debug)
      console.log("Matrix2d->get_element(): row(" + row.toString() + "), column(" + column.toString() + ")");
    
    return false;
  }
  
  if ((row < 0) || (row > (this.num_rows - 1)) || (column < 0) || (column > this.num_columns - 1)) {
    if (this.debug)
      console.log("Matrix2d->get_element(): index out of range; expected ((0 - " + (this.num_rows - 1).toString() + "), (0 - " + (this.num_columns - 1).toString() + ") -- received (" + row.toString() + ", " + column.toString() + ")");
    
    return false;
  }
  
  return this.matrix[(row * this.num_columns) + column];
};


/* add():
 *   adds left operand [this] with right operand [input]
 */
Matrix2d.prototype.add = function(right, assign) {
  var matrix = this.matrix;
  var i, j, temp;
  
  if (!(right instanceof Matrix2d)) {
    if (this.debug)
      console.log("Matrix2d->add(): right operand [input] is not a Matrix2d instance");
    
    return false;
  }
  
  if ((this.num_rows != right.num_rows) || (this.num_columns != right.num_columns)) {
    if (this.debug)
      console.log("Matrix2d->add(): size mismatch (expected identically sized matrices); left operand [this] (" + this.num_rows.toString() + ", " + this.num_columns.toString() + ") -- right operand [input] (" + right.num_rows.toString() + ", " + right.num_columns.toString() + ")");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      matrix[(i * this.num_columns) + j] += right.matrix[(i * this.num_columns) + j];
  
  if (assign === undefined)
    assign = true; /* if unknown, default action is to assign */
  
  if (assign) {
    this.matrix = matrix;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* scalar_add():
 *   adds scalar to each element
 */
Matrix2d.prototype.scalar_add = function(scalar) {
  var i, j;
  
  if (typeof scalar !== "number") {
    if (this.debug)
      console.log("Matrix2d->scalar_add(): input scalar is not a number");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      this.matrix[(i * this.num_columns) + j] += scalar;
  
  return true;
};


/* subtract():
 *   subtracts the right operand [input] from the left operand [this]
 */
Matrix2d.prototype.subtract = function(right, assign) {
  var matrix = this.matrix;
  var i, j, temp;
  
  if (!(right instanceof Matrix2d)) {
    if (this.debug)
      console.log("Matrix2d->subtract(): right operand [input] is not a Matrix2d instance");
    
    return false;
  }
  
  if ((this.num_rows != right.num_rows) || (this.num_columns != right.num_columns)) {
    if (this.debug)
      console.log("Matrix2d->subtract(): size mismatch (expected identically sized matrices); left operand [this] (" + this.num_rows.toString() + ", " + this.num_columns.toString() + ") -- right operand [input] (" + right.num_rows.toString() + ", " + right.num_columns.toString() + ")");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      matrix[(i * this.num_columns) + j] -= right.matrix[(i * this.num_columns) + j];
  
  if (assign === undefined)
    assign = true; /* if unknown, default action is to assign */
  
  if (assign) {
    this.matrix = matrix;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* scalar_subtract():
 *   multiplies each element by the scalar
 */
Matrix2d.prototype.scalar_subtract = function(scalar) {
  var i, j;
  
  if (typeof scalar !== "number") {
    if (this.debug)
      console.log("Matrix2d->scalar_subtract(): input scalar is not a number");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      this.matrix[(i * this.num_columns) + j] -= scalar;
  
  return true;
};


/* multiply():
 *   multiplies two matrices
 *   
 *   A(m, n) * B(n, p) = C(m, p);
 *   
 *   since multiplication can actually change the dimensions of the matrix i'm
 *   wondering if i shouldn't make the math operations (or perhaps multiply,
 *   which would include division) not assign by default
 */
Matrix2d.prototype.multiply = function(right, assign) {
  var matrix = [];
  var total = 0;
  var i, j, k, l, temp;
  if (!(right instanceof Matrix2d)) {
    if (this.debug)
      console.log("Matrix2d->multiply(): right operand [input] is not a Matrix2d instance");
    
    return false;
  }
  
  /* left operand columns must equal right operand's rows */
  if (this.num_columns != right.num_rows) {
    if (this.debug)
      console.log("Matrix2d->multiply(): size mismatch (left columns do not match right rows) -- left operand [this] (" + this.num_rows.toString() + ", " + this.num_columns.toString() + ") -- right operand [input] (" + right.num_rows.toString() + ", " + right.num_columns.toString() + ")");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++) {
    for (j = 0; j < right.num_columns; j++) {
      total = 0;
      
      for (k = 0, l = right.num_rows, m = j; k < l; k++, m += right.num_columns)
        total += this.matrix[(i * this.num_columns) + k] * right.matrix[m];
      
      matrix.push(total);
    }
  }
  
  if (assign === undefined)
    assign = true;
  
  if (assign) {
    this.matrix = matrix;
    this.columns = right.columns;
  } else {
    temp = new Matrix2d(this.num_rows, right.num_columns, this.debug);
    
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* scalar_multiply():
 *   multiplies each element by the scalar
 */
Matrix2d.prototype.scalar_multiply = function(scalar) {
  var i, j;
  
  if (typeof scalar !== "number") {
    if (this.debug)
      console.log("Matrix2d->scalar_multiply(): input scalar is not a number");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      this.matrix[(i * this.num_columns) + j] *= scalar;
  
  return true;
};


/* product():
 *   alias to multiply()
 */
Matrix2d.prototype.product = Matrix2d.prototype.multiply;


/* scalar_product():
 *   alias to scalar_multiply()
 */
Matrix2d.prototype.scalar_product = Matrix2d.prototype.scalar_multiply;

/* divide():
 *   divide left by the right
 * 
 */
Matrix2d.prototype.divide = function(right, assign) {
};


/* scalar_divide():
 *   divide each element by scalar
 */
Matrix2d.prototype.scalar_divide = function(scalar) {
  var i, j;
  
  if (typeof scalar !== "number") {
    if (this.debug)
      console.log("Matrix2d->scalar_divide(): input scalar is not a number");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      this.matrix[(i * this.num_columns) + j] /= scalar;
  
  return true;
};


/* cw():
 *   rotates the matrix clockwise by 90 degrees
 *   
 *   assign is a boolean determining whether the result is assigned to this
 *   matrix or the result is returned
 */
Matrix2d.prototype.cw = function(assign) {
  var matrix = [];
  var i, j, row, temp;
  
  for (i = 0; i < this.num_columns; i++)
    for (row = this.num_rows - 1, j = (i + (row * this.num_columns)); j >= 0; j -= this.num_columns, row--)
      matrix.push(this.matrix[j]);
  
  if (assign === undefined)
    assign = true; /* if not specified, default action for rotation is to assign the result */
  
  if (assign) {
    this.matrix = matrix;
    
    temp = this.num_columns;
    this.num_columns = this.num_rows;
    this.num_rows = temp;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* ccw():
 *   rotates the matrix counter-clockwise by 90 degrees
 *   
 *   assign is a boolean determining whether the result is assigned to this
 *   matrix or the result is returned
 */
Matrix2d.prototype.ccw = function(assign) {
  var matrix = [];
  var i, j, row, temp;
  
  for (i = this.num_columns - 1; i >= 0; i--)
    for (row = 0, j = (i + (row * this.num_columns)); row < this.num_rows; j += this.num_columns, row++)
      matrix.push(this.matrix[j]);
  
  if (assign === undefined)
    assign = true; /* if not specified, default action for rotation is to assign the result */
  
  if (assign) {
    this.matrix = matrix;
    
    temp = this.num_columns;
    this.num_columns = this.num_rows;
    this.num_rows = temp;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* rotate():
 *   wrapper function for using cw and ccw
 *   
 *   see cw() or ccw() for assign
 */
Matrix2d.prototype.rotate = function(direction, assign) {
  if (assign === undefined)
    assign = true; /* if not specified, default action for rotation is to assign the result */
  
  if ((direction == "cw") || (direction == 0)) {
    return this.cw(assign);
  } else if ((direction == "ccw") || (direction == 1)) {
    return this.ccw(assign);
  }
  
  if (this.debug)
    console.log("Matrix2d->rotate(): possible rotation directions are (\"cw\", \"ccw\", 0, and 1) -- (received " + direction.toString() + ")");
  
  return false;
};


/* invert():
 *   inverts the current matrix if possible
 */
Matrix2d.prototype.invert = function() {
  if (this.num_rows != this.num_columns) {
    if (this.debug)
      console.log("Matrix2d->invert(): matrix not square, unable to invert");
    
    return false;
  }
};


/* transpose():
 *   transposes the current matrix
 */
Matrix2d.prototype.transpose = function(assign) {
  var i, j, temp;
  var matrix = [];
  
  for (i = 0; i < this.num_columns; i++)
    for (j = 0; j < this.num_rows; j++)
      matrix.push(this.matrix[i + (j * this.num_columns)]);
  
  if (assign === undefined)
    assign = true;
  
  if (assign) {
    temp = this.num_rows;
    this.num_rows = this.num_columns;
    this.num_columns = temp;
    
    this.matrix = matrix;
  } else {
    temp = new Matrix2d(this.num_columns, this.num_rows, this.debug);
    
    temp.update(matrix);
    
    return temp;
  }
  
  return true;
};


/* contains():
 *   determines if the matrix contains a particular value
 *   
 *   use this if you simply want to know if a value exists in the matrix
 */
Matrix2d.prototype.contains = function(value) {
  var i, j;
  
  if (value === undefined) {
    if (this.debug)
      console.log("Matrix2d->contains(): undefined value");
    
    return false;
  }
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      if (this.matrix[(i * this.num_columns) + j] == value)
        return true;
  
  return false;
};


/* row_contains():
 * 
 */
Matrix2d.prototype.row_contains = function(index, value) {
  var i, j;
  
  if (value === undefined) {
    if (this.debug)
      console.log("Matrix2d->row_contains(): undefined value");
    
    return false;
  } else if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->row_contains(): value undefined");
    
    return false;
  }
  
  if ((index < 0) || (index >= this.num_rows)) {
    if (this.debug)
      console.log("Matrix2d->row_contains(): index out of range; expected (0 - " + (this.num_rows - 1).toString() + ") -- received (" + index.toString() + ")");
    
    return false;
  }
  
  for (i = (index * this.num_columns), j = ((index + 1) * this.num_columns); i < j; i++)
    if (this.matrix[i] == value)
      return true;
  
  return false;
};


/* column_contains():
 * 
 */
Matrix2d.prototype.column_contains = function(index, value) {
  var i, j;
  
  if (value === undefined) {
    if (this.debug)
      console.log("Matrix2d->column_contains(): undefined value");
    
    return false;
  } else if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->row_contains(): value undefined");
    
    return false;
  }
  
  if ((index < 0) || (index >= this.num_columns)) {
    if (this.debug)
      console.log("Matrix2d->column_contains(): index out of range; expected (0 - " + (this.num_columns - 1).toString() + ") -- received (" + index.toString() + ")");
    
    return false;
  }
  
  for (i = index, j = (this.num_rows * this.num_columns); i < j; i += this.num_columns)
    if (this.matrix[i] == value)
      return true;
  
  return false;
};


/* find():
 *   finds and returns index pairs (row, column) for a particular value
 *   
 *   use this if you want to know if a value exists, and if it does where
 *   
 *   also, having a default dimensionality of 2 seems to make more sense to me
 *   when you consider something like this:
 *   
 *     if ((pairs = m.find(value)) != false)
 *       for (i = 0, l = pairs.length; i < l; i++)
 *         m.set_element((pairs[i])[0], (pairs[i])[1], newvalue);
 */
Matrix2d.prototype.find = function(value, dimension) {
  var i, j;
  var pairs = [];
  
  if (value === undefined) {
    if (this.debug)
      console.log("Matrix2d->find(): undefined value");
    
    return false;
  }
  
  if ((dimension != 1) && (dimension != 2))
    dimension = 2;
  
  for (i = 0; i < this.num_rows; i++) {
    for (j = 0; j < this.num_columns; j++) {
      if (this.matrix[(i * this.num_columns) + j] == value) {
        if (dimension == 1)
          pairs.push((i * this.num_columns) + j);
        else if (dimension == 2)
          pairs.push([i, j]);
        else {
          if (this.debug)
            console.log("Matrix2d->find(): invalid dimensionality");
          
          return false;
        }
      }
    }
  }
        
  if (pairs.length >= 1)
    return pairs;
  
  return false;
};


/* row_find():
 * 
 */
Matrix2d.prototype.row_find = function(index, value) {
  var i, j;
  var indices = [];
  
  if (value === undefined) {
    if (this.debug)
      console.log("Matrix2d->row_find(): undefined value");
    
    return false;
  } else if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->row_find(): value undefined");
    
    return false;
  }
  
  if ((index < 0) || (index >= this.num_rows)) {
    if (this.debug)
      console.log("Matrix2d->row_find(): index out of range; expected (0 - " + (this.num_rows - 1).toString() + ") -- received (" + index.toString() + ")");
    
    return false;
  }
  
  for (i = (index * this.num_columns), j = ((index + 1) * this.num_columns); i < j; i++)
    if (this.matrix[i] == value)
      indices.push(i);
  
  if (indices.length >= 1)
    return indices;
  
  return false;
};


/* column_find():
 * 
 */
Matrix2d.prototype.column_find = function(index, value) {
  var i, j;
  var indices = [];
  
  if (value === undefined) {
    if (this.debug)
      console.log("Matrix2d->column_find(): undefined value");
    
    return false;
  } else if (index === undefined) {
    if (this.debug)
      console.log("Matrix2d->column_find(): value undefined");
    
    return false;
  }
  
  if ((index < 0) || (index >= this.num_rows)) {
    if (this.debug)
      console.log("Matrix2d->column_find(): index out of range; expected (0 - " + (this.num_columns - 1).toString() + ") -- received (" + index.toString() + ")");
    
    return false;
  }
  
  for (i = index, j = (this.num_rows * this.num_columns); i < j; i += this.num_columns)
    if (this.matrix[i] == value)
      indices.push(i);
  
  if (indices.length >= 1)
    return indices;
  
  return false;
};


/* minimize():
 *   removes matrix padding.  meaning any edge row or column that has nothing
 *   but a 0 will be removed.  this will continue up to a non-zero row, meaning
 *   you're returned with a matrix, potentially of a new size, which does not
 *   have a single row or column on the matrix's EDGE that doesn't have a value
 *   
 *   this matrix:          becomes:
 *     [                     [
 *       0, 0, 0, 0, 0,        1, 0, 2, 0,
 *       1, 0, 2, 0, 0,        0, 0, 0, 1,
 *       0, 0, 0, 1, 0,        0,-2, 0, 1,
 *       0,-2, 0, 1, 0,        2, 0, 2, 0
 *       2, 0, 2, 0, 0       ]
 *     ]
 */
Matrix2d.prototype.minimize = function() {
  var matrix = [];
  var result = {};
  var top, right, bottom, left, i, j;
  
  top = this.num_rows;
  bottom = 0;
  left = this.num_columns;
  right = 0;
  
  for (i = 0; i < this.num_rows; i++) {
    for (j = 0; j < this.num_columns; j++) {
      if (this.matrix[(i * this.num_columns) + j] != 0) {
        if (i < top)
          top = i;
        
        if (i > bottom)
          bottom = i;
        
        if (j < left)
          left = j;
        
        if (j > right)
          right = j;
      }
    }
  }
  
  for (i = top; i <= bottom; i++)
    for (j = left; j <= right; j++)
      matrix.push(this.matrix[(i * this.num_columns) + j]);
  
  result.top = top;
  result.bottom = (this.num_rows - bottom) - 1;
  result.left = left;
  result.right = (this.num_columns - right) - 1;
  
  this.matrix = matrix;
  this.num_rows = (bottom - top) + 1;
  this.num_columns = (right - left) + 1;

  return result;
};


/* copy():
 *   sets this matrix's data to the source's values
 */
Matrix2d.prototype.copy = function(source) {
  if (!(source instanceof Matrix2d)) {
    if (this.debug)
      console.log("Matrix2d->copy(): source material not a Matrix2d instance");
    
    return false;
  }
  
  this.num_rows = source.num_rows;
  this.num_columns = source.num_columns;
  this.matrix = source.matrix;
};


/* clone():
 *   creates and returns a new Matrix2d with this matrix's values
 */
Matrix2d.prototype.clone = function() {
  var clone = new Matrix2d(this.num_rows, this.num_columns);
  
  clone.update(this.matrix);
  
  return clone;
};


/* toString():
 *   returns a string representing the current matrix
 */
Matrix2d.prototype.toString = function() {
  var buf = "";
  var str = "";
  var largest = 0;
  var temp = 0;
  var i, j;
  
  for (i = 0; i < this.num_rows; i++)
    for (j = 0; j < this.num_columns; j++)
      if ((temp = this.matrix[(i * this.num_columns) + j].toString().length) > largest)
        largest = temp;
      
  
  for (i = 0; i < this.num_rows; i++) {
    for (j = 0; j < this.num_columns; j++) {
      str = this.matrix[(i * this.num_columns) + j].toString();
      buf += (j == 0 ? "" : " ") + Array(largest + 1 - str.length).join(" ") + str;
    }
    
    buf += "\r\n";
  }
  
  if (this.debug)
    console.log(buf);
  
  return buf;
};
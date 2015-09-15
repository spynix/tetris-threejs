/*    File: structs.js, a part of my tetris-threejs project
 *  Author: Jin Savage ("spynix")
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

"use strict";


function Block(block, group, parent) {
  this.block = block;
  
  this.parent = parent;
  
  if (group)
    this.group = group;
  else
    this.group = tetris.world.group;
  
  this.x = 0;
  this.y = 0;
  this.z = 0;
  
  this.row = 0;
  this.column = 0;
  
  this.animation = 0;
  this.frame = 0;
  
  this.visible = false;
}


Block.prototype.show = function() {
  this.group.add(this.block);
  this.visible = true;
};


Block.prototype.hide = function() {
  this.group.remove(this.block);
  this.visible = false;
};


Block.prototype.remove = function() {
  this.group.remove(this.block);
  
  this.block = null;
  this.parent = null;
  this.group = null;
  this.x = null;
  this.y = null;
  this.z = null;
  this.row = null;
  this.column = null;
  this.animation = null;
  this.frame = null;
  this.visible = null;
};


/* goto():
 *   sets the block's position correctly relative to the row and column of its
 *   matrix.
 *   
 *   //        block.position.set(j, (this.matrix.num_rows - 1) - i, 0);
 */
Block.prototype.goto = function(row, column) {
  this.row = row;
  this.column = column;
  
  this.set_position(column, (this.parent !== undefined) ? ((this.parent.matrix.num_rows - 1) - row) : row, 0);
};


Block.prototype.set_position = function(x, y, z) {
  /* needs validating */
  
  this.x = x;
  this.y = y;
  this.z = z;
  
  this.block.position.set(x, y, z);
};


Block.prototype.get_position = function() {
  return {
    x: this.x,
    y: this.y,
    z: this.z,
    row: this.row,
    column: this.column
  };
};


Block.prototype.frame_single = (function() {
  var scale_delta = 0;
  
  return function(reset) {
    if (reset)
      scale_delta = 0;
    
    if (this.animation != ANIM_SINGLE)
      return -1;
    
    this.block.scale.x = Math.max(0, this.block.scale.x -= 0.02);
    this.block.scale.y = Math.max(0, this.block.scale.y -= 0.02);
    this.block.scale.z = Math.max(0, this.block.scale.z -= 0.02);
    
    scale_delta += 0.02;
    
    if ((scale_delta >= 1) || (this.block.scale.x <= 0) || (this.block.scale.y <= 0) || (this.block.scale.z <= 0)) {
      this.animation = ANIM_NONE;
      this.block.scale.set(0, 0, 0);
      
      scale_delta = 0;
      
      return 1;
    }
    
    return 0;
  };
})();


Block.prototype.frame_double = function(reset) {
};


Block.prototype.frame_turkey = function(reset) {
};


Block.prototype.frame_tetris = function(reset) {
};


Block.prototype.animate = function(id) {
  if (this.animation != ANIM_NONE) /* one animation at a time on a block */
    return false;
  
  if ((id == ANIM_SINGLE) && (!tetris.config.graphics.animations.animation_single))
    return false;
  else if ((id == ANIM_DOUBLE) && (!tetris.config.graphics.animations.animation_double))
    return false;
  else if ((id == ANIM_TURKEY) && (!tetris.config.graphics.animations.animation_turkey))
    return false;
  else if ((id == ANIM_TETRIS) && (!tetris.config.graphics.animations.animation_tetris))
    return false;
  
  this.animation = ~~id;
  this.frame = 0; /* currently unused */
};


Block.prototype.step = function() {
  var result = 0;
  
  switch (this.animation) {
    case ANIM_SINGLE:
      if (!tetris.config.graphics.animations.animation_single)
        return false;
      
      result = this.frame_single();
      break;
    case ANIM_DOUBLE:
      if (!tetris.config.graphics.animations.animation_double)
        return false;
      
      this.frame_double();
      break;
    case ANIM_TURKEY:
      if (!tetris.config.graphics.animations.animation_turkey)
        return false;
      
      this.frame_turkey();
      break;
    case ANIM_TETRIS:
      if (!tetris.config.graphics.animations.animation_tetris)
        return false;
      
      this.frame_tetris();
      break;
    case ANIM_NONE: /* fall through */
    default:
      result = 0;
      break;
  }
  
  return result;
};


function Tetrimino(config, parent, helper) {
  var i, j, block;
  
  this.type = config.type;
  
  this.matrix = new Matrix2d(config.size, config.size, false);
  this.offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  
  this.group = new THREE.Group();
  
  /* row and column are helpers that refer to this tetrimino's worldspace
   * location in tetris.board.group for the purposes of rendering the tetrimino
   * in the right place.  unfortunately the y axis for this version is inverted
   * relative to web standards so it's a little unintuitive (meaning unlike
   * DOM element offsets, such as those obtained from bounding rects, the (x, y)
   * does not start at the upper left corner, but in the lower left corner
   */
  this.row = 0;
  this.column = 0;
  
  this.rotation = 0;
  this.visible = false;
  this.blocks = [];
  
  this.matrix.update(config.matrices[0]);
  
  if (parent)
    this.parent = parent;
  else
    this.parent = tetris.world.group;
  
  this.parent.add(this.group);
  
  for (i = 0; i < this.matrix.num_rows; i++) {
    for (j = 0; j < this.matrix.num_columns; j++) {
      if (this.matrix.matrix[(i * this.matrix.num_columns) + j] == 1) {
//        block = tetris.graphics.redblock.clone();
        block = new Block(tetris.graphics.redblock.clone(), this.group, this);
        
//        block.position.set(j, (this.matrix.num_rows - 1) - i, 0);

        block.goto(i, j, 0);
        
        this.blocks.push(block);
      }
    }
  }
  
  for (i = 0, j = this.blocks.length; i < j; i++)
    this.blocks[i].show();
//    this.group.add(this.blocks[i]);

  if (helper) {
    this.helper = new THREE.BoundingBoxHelper(this.group, 0xff6060);
    this.helper.update();
    this.parent.add(this.helper);
  }
}


Tetrimino.prototype.position_blocks = function() {
  var i, j;
  var n = 0;
  
  for (i = 0; i < this.matrix.num_rows; i++)
    for (j = 0; j < this.matrix.num_columns; j++)
      if (this.matrix.matrix[(i * this.matrix.num_columns) + j] == 1)
        this.blocks[n++].goto(i, j, 0);
//        this.blocks[n++].position.set(j, (this.matrix.num_rows - 1) - i, 0);
};


Tetrimino.prototype.show = function() {
  var i, l;
  
  this.parent.add(this.group);
  this.visible = true;
  
  for (i = 0, l = this.blocks.length; i < l; i++)
    this.blocks[i].show();
//    this.group.add(this.blocks[i]);
};


Tetrimino.prototype.hide = function() {
  var i, l;
  
  this.parent.remove(this.group);
  this.visible = false;
  
  for (i = 0, l = this.blocks.length; i < l; i++)
    this.blocks[i].hide();
//    this.group.remove(blocks[i]);
};


Tetrimino.prototype.remove = function() {
  var i, l;
  
  for (i = 0, l = this.blocks.length; i < l; i++)
    this.blocks[i].remove();
//    this.group.remove(this.blocks[i]);
  
  this.parent.remove(this.group);
  
  this.parent = null;
  this.type = null;
  this.matrix = null;
  this.matrix_size = null;
  this.row = null;
  this.column = null;
  this.visible = null;
  this.blocks = null;
};


Tetrimino.prototype.set_position = function(x, y, z) {
  if (x === undefined)
    x = 0;
  
  if (y === undefined)
    y = 0;
  
  if (z === undefined)
    z = 0;
  
  this.group.position.set(x, y, z);
};


Tetrimino.prototype.goto = function(row, column) {
  this.row = Math.max(-3, Math.min(19, row));
  this.column = Math.max(-3, Math.min(9, column));
  
  this.set_position(this.column, this.row, 0);
  
  /* bottom and right don't calculate quite right, but they aren't NECESSARY for
   * anything right now so i haven't bothered to fix them yet 
   */
  this.offsets.top = 20 - (this.row + this.matrix.num_rows);
  this.offsets.left = this.column;
  this.offsets.bottom = this.row;
  this.offsets.right = 10 - (this.column + this.matrix.num_columns);
};


/* can_move():
 *   right now this is a convoluted nonsense nightmare.  i plan to (in the near
 *   future) add in proper constraints/bounds to my matrix2d class and alleviate
 *   a lot of this... but for now it's gonna stay functional but fail
 *   
 *   mm = minimized matrix
 */
Tetrimino.prototype.can_move = function(direction) {
  var mm = new Matrix2d(this.matrix.num_rows, this.matrix.num_columns, this.matrix.debug);
  var i, j, k, l, against, offsets, top, left, rotation, temp;
  var chunk = [];
  
  top = 0;
  left = 0;
  rotation = this.rotation;
  
  if (direction == RIGHT)
    left++;
  else if (direction == DOWN)
    top++;
  else if (direction == LEFT)
    left--;
  
  if (direction == ROTATE) {
    if ((rotation + 1) > (tetriminos[this.type].matrices.length - 1))
      rotation = 0;
    else
      rotation++;
    
    mm.update(tetriminos[this.type].matrices[rotation]);
  } else
    mm.update(this.matrix.matrix);
  
  offsets = mm.minimize(); /* minimize is permanent, it just returns the offsets */
  against = new Matrix2d(mm.num_rows, mm.num_columns, mm.matrix.debug);
  
  for (i = (this.offsets.top + offsets.top + top), j = (i + mm.num_rows); i < j; i++) {
    for (k = (this.offsets.left + offsets.left + left), l = (k + mm.num_columns); k < l; k++) {
      /* this will catch a down violation (y) on the board */
      temp = tetris.board.matrix.matrix[(i * tetris.board.matrix.num_columns) + k] !== undefined ? tetris.board.matrix.matrix[(i * tetris.board.matrix.num_columns) + k] : 9;
      
      /* and this will catch any left and right (x) violations */
      if ((k >= tetris.board.matrix.num_columns) || (k < 0))
        temp = 9;
      
      chunk.push(temp);
    }
  }
  
  against.update(chunk);
  against.add(mm);
  
  for (i = 0; i < against.num_rows; i++) {
    for (j = 0; j < against.num_columns; j++) {
      if ((against.matrix[(i * against.num_columns) + j] >= 2) || (against.matrix[(i * against.num_columns) + j] === undefined)) {
        if ((direction == LEFT) || (direction == RIGHT) || (direction == ROTATE))
          return 1;
        else if (direction == DOWN)
          return 2;
        else
          return 1;
      }
    }
  }
  
  return 0;
};


Tetrimino.prototype.collide = function(direction) {
  if (direction == DOWN)
    tetris.collided = true;
};


Tetrimino.prototype.move = function(direction) {
  var result;
  
  if ((result = this.can_move(direction)) != 0) {
    this.collide(direction);
    
    return false;
  }
  
  switch (direction) {
    case UP:
      this.goto(this.row + 1, this.column);
      break;
    case RIGHT:
      this.goto(this.row, this.column + 1);
      break;
    case DOWN:
      this.goto(this.row - 1, this.column);
      break;
    case LEFT:
      this.goto(this.row, this.column - 1);
      break;
    default:
      break;
  }
};


Tetrimino.prototype.rotate = function() {
  if (this.can_move(ROTATE) != 0) {
    return false;
  }
  
  if ((this.rotation + 1) > (tetriminos[this.type].matrices.length - 1))
    this.rotation = 0;
  else
    this.rotation++;
  
  this.matrix.update(tetriminos[this.type].matrices[this.rotation]);
  this.position_blocks();
};
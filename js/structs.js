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
  this.visible = false;
  
  this.animation = 0;
  this.frame = 0;
  this.wait = 0;
  
  this.target_x = 0;
  this.target_y = 0;
  this.target_z = 0;
  
  this.speed_x = 0;
  this.speed_y = 0;
  this.speed_z = 0;
  
  this.target_negative = true;
  this.recalculate = true;
  this.fall = false;
  this.speed = 0;
  this.n = 1;
  this.exploding = false;
  this.positioned = false;
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
  this.visible = null;
  
  this.animation = null;
  this.frame = null;
  this.wait = null;
  
  this.target_x = null;
  this.target_y = null;
  this.target_z = null;
  
  this.speed_x = null;
  this.speed_y = null;
  this.speed_z = null;
  
  this.target_negative = null;
  this.recalculate = null;
  this.fall = null;
  this.speed = null;
  this.n = null;
  this.exploding = null;
  this.positioned = null;
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


Block.prototype.frame_single = function(reset) {
  if (reset) {
    if (tetris.config.graphics.animations.animation_single_constant)
      this.speed = 0.02;
    else
      this.speed = 0.015 + (tetris.rng.between(0, 4) / 100);
    
    return 4;
  }
  
  if (this.animation != ANIM_SINGLE)
    return -1;

  this.block.scale.x = Math.max(0, this.block.scale.x -= this.speed);
  this.block.scale.y = Math.max(0, this.block.scale.y -= this.speed);
  this.block.scale.z = Math.max(0, this.block.scale.z -= this.speed);

  if ((this.block.scale.x <= 0) || (this.block.scale.y <= 0) || (this.block.scale.z <= 0)) {
    this.animation = ANIM_NONE;
    this.block.scale.set(0, 0, 0);

    return 1;
  }

  return 0;
};


Block.prototype.frame_double = function(reset) {
  if (reset) {
    this.target_x = this.block.position.x + 1;
    this.speed = 0.1;
    this.fall = false;
    
    return 4;
  }
  
  if (this.animation != ANIM_DOUBLE)
    return -1;
  
  if (this.block.position.x >= this.target_x)
    this.fall = true;
  
  if (!this.fall) {
    this.block.scale.x -= 0.0006;
    this.block.scale.y -= 0.0006;
    this.block.scale.z -= 0.0006;
    
    this.block.position.x += Math.min(this.speed, Math.max(this.speed * Math.abs(this.target_x - this.block.position.x), this.speed / 4));
  } else {
    this.block.position.x -= Math.min(this.speed * 2, Math.max(this.speed * Math.abs(this.target_x - this.block.position.x), this.speed / 4));
  }

  if (this.block.position.x < -1) {
    this.animation = ANIM_NONE;

    return 1;
  }

  return 0;
};


/* I wasn't real happy with where this was going, but I left it in in case I
 * wanted to revisit it, or maybe someone else did.
 */
/* 
Block.prototype.frame_double = function(reset) {
  if (this.animation != ANIM_DOUBLE)
    return -1;
  
  if (this.block.position.y >= this.target_y)
    this.fall = true;
  
  if (this.column <= 4)
    this.block.position.x -= ((this.speed / 60) + ((5 - this.column) / 100));
  else
    this.block.position.x += ((this.speed / 60) + ((this.column - 4) / 100));
  
  this.block.position.z += (this.speed / 4);

  if (!this.fall)
    this.block.position.y += this.speed;
  else
    this.block.position.y -= this.speed;

  if (this.block.position.y < -6) {
    this.animation = ANIM_NONE;

    return 1;
  }

  return 0;
};
*/


Block.prototype.frame_turkey = function(reset) {
  if (reset) {
    this.fall = false;
    this.speed = 0.02 + (tetris.rng.between(0, 4) / 100);
    this.n = 1;
    this.frame = 1;
    this.wait = tetris.rng.between(0, 90);
    
    return 4;
  }

  if (this.animation != ANIM_TURKEY)
    return -1;

  if (this.block.position.z >= 1.2)
    this.fall = true;

  if (!this.fall) {
    this.block.position.z += this.speed;
  } else {
      if (this.n < this.wait) {
        this.n++;
        return 0;
      }
    
    this.block.position.y -= 0.015 * this.frame;

    if (this.block.position.y <= -6)
      return 1;

    this.frame++;
  }

  return 0;
};


/* I wasn't real happy with where this was going, but I left it in in case I
 * wanted to revisit it, or maybe someone else did.
 */
/*
Block.prototype.frame_turkey = function(reset) {
    if (reset) {
      this.target_negative = false;
      this.recalculate = true;
      this.fall = false;
      this.n = 1;
      this.target_z = -1;
      this.speed = 0.02;
    }
    
    if (this.animation != ANIM_TURKEY)
      return -1;
    
    if (this.block.position.z >= 1.2)
      this.fall = true;
  
    if ((this.recalculate == true) && (!this.fall)) {
      this.target_z = (0.1 * this.n) + ((tetris.rng.between(0, 200) - 100) / 100);
      this.speed = (0.04 * this.n) + (tetris.rng.between(0, 20) / 1000);
      
      if (this.target_z >= 0)
        this.target_negative = false;
      else
        this.target_negative = true;
      
      this.recalculate = false;
    }
    
    if (!this.fall) {
      if (this.target_negative) {
        this.block.position.z -= this.speed;

        if (this.block.position.z <= this.target_z) {
          this.recalculate = true;
          this.n++;
        }
      } else {
        this.block.position.z += this.speed;
        
        if (this.block.position.z >= this.target_z) {
          this.recalculate = true;
          this.n++;
        }
      }
    } else {
      this.block.position.y -= 0.15;
      
      if (this.block.position.y <= -6)
        return 1;
    }
    
    return 0;
};
*/


Block.prototype.frame_tetris = (function() {
  var num_positioned = 0;
  
  return function(reset) {
    if (reset) {
      num_positioned = 0;
      
      this.exploding = false;
      this.positioned = false;
      this.wait = 45;
      this.n = 1;

      this.speed = 0.1 + (tetris.rng.between(0, 3) / 10);

//      if (this.block.position.x >= 4.5)
//        this.speed_x = (this.block.position.x) / 45;
//      else if (this.block.position.x < 4.5)
//        this.speed_x = (4.5 - this.block.position.x) / 45;
//
//
//      if (this.block.position.y > 10)
//        this.speed_y = (this.block.position.y - 10) / 45;
//      else if (this.block.position.y < 10)
//        this.speed_y = (10 - this.block.position.y) / 45;
      this.speed_x = (4.5 - this.block.position.x) / 45;
      this.speed_y = (10 - this.block.position.y) / 45;
      this.speed_z = (1.5 - this.block.position.z) / 45;
      
      return 4;
    }
    
    if (this.animation != ANIM_TETRIS)
      return -1;

    if (!this.positioned && !this.exploding) {
      if ((this.block.position.x >= (4.5 - Math.abs(this.speed_x))) && (this.block.position.x <= (4.5 + Math.abs(this.speed_x))))
        this.block.position.x = 4.5;
      
      if ((this.block.position.y >= (10 - Math.abs(this.speed_y))) && (this.block.position.y <= (10 + Math.abs(this.speed_y))))
        this.block.position.y = 10;
      
      if ((this.block.position.z >= (1.5 - Math.abs(this.speed_x))) && (this.block.position.z <= (1.5 + Math.abs(this.speed_x))))
        this.block.position.z = 1.5;
      
      if ((this.block.position.x == 4.5) && (this.block.position.y == 10) && (this.block.position.z == 1.5)) {
        this.positioned = true;
        num_positioned++;
      }
      
      if (!this.positioned) {
        if (this.block.position.x != 4.5)
          this.block.position.x += this.speed_x;

        if (this.block.position.y != 10)
          this.block.position.y += this.speed_y;

        if (this.block.position.z != 1.5)
          this.block.position.z += this.speed_z;
      }
    } else if (num_positioned < 40) {
      return 0;
    } else if (this.positioned && (this.n < this.wait)) {
      this.n++;
    } else if (this.positioned && !this.exploding) {
      this.exploding = true;
      this.target_x = 25 * Math.cos(tetris.rng.between(0, 180));
      this.target_y = 25 * Math.cos(tetris.rng.between(0, 180));
      this.target_z = 25 * Math.cos(tetris.rng.between(0, 180));
      
      this.speed_x = this.target_x / 90;
      this.speed_y = this.target_y / 90;
      this.speed_z = this.target_z / 90;
      
      this.n = 0;
      this.wait = -1;
    } else if (this.positioned && this.exploding) {
      if ((this.n > 120) ||
         ((Math.abs(this.block.position.x) >= 25) ||
          (Math.abs(this.block.position.y) >= 25) ||
          (Math.abs(this.block.position.z) >= 25))) {
        this.animation = ANIM_NONE;

        return 1;
      }
      
      this.block.position.x += this.speed_x;
      this.block.position.y += this.speed_y;
      this.block.position.z += this.speed_z;
      
      this.n++;
    }

    return 0;
  };
})();


Block.prototype.animate = function(id) {
  if (this.animation != ANIM_NONE) /* one animation at a time on a block */
    return -3;
  
  if (id == ANIM_SINGLE) {
    if (!tetris.config.graphics.animations.animation_single)
      return -2;
    
    this.frame_single(true);
  } else if (id == ANIM_DOUBLE) {
    if (!tetris.config.graphics.animations.animation_double)
      return -2;
    
    this.frame_double(true);
  } else if (id == ANIM_TURKEY) {
    if (!tetris.config.graphics.animations.animation_turkey)
      return -2;
    
    this.frame_turkey(true);
  } else if (id == ANIM_TETRIS) {
    if (!tetris.config.graphics.animations.animation_tetris)
      return -2;
    
    this.frame_tetris(true);
  } else {
    return -3;
  }
  
  this.animation = ~~id;
  this.frame = 0; /* currently unused */
  
  return 0;
};


Block.prototype.step = function() {
  var result = 0;
  
  switch (this.animation) {
    case ANIM_SINGLE:
      if (!tetris.config.graphics.animations.animation_single)
        return -2;
      
      result = this.frame_single();
      break;
    case ANIM_DOUBLE:
      if (!tetris.config.graphics.animations.animation_double)
        return -2;
      
      result = this.frame_double();
      break;
    case ANIM_TURKEY:
      if (!tetris.config.graphics.animations.animation_turkey)
        return -2;
      
      result = this.frame_turkey();
      break;
    case ANIM_TETRIS:
      if (!tetris.config.graphics.animations.animation_tetris)
        return -2;
      
      result = this.frame_tetris();
      break;
    case ANIM_NONE: /* fall through */
    default:
      result = -4;
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
  
  if ((direction == LEFT) && tetris.controls.ispressing("right"))
    return false;
  else if ((direction == RIGHT) && tetris.controls.ispressing("left"))
    return false;
  
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
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


function Tetrimino(config, parent) {
  var i, j, block;
  
  this.type = config.type;
  this.matrix_size = config.size;
  this.matrix = new Matrix2d(this.matrix_size, this.matrix_size, false);
  this.row = 0;
  this.column = 0;
  this.visible = false;
  this.blocks = [];
  
  this.matrix.update(config.matrices[0]);
  
  if (parent)
    this.parent = parent;
  else
    this.parent = tetris.scene;
  
  this.group = new THREE.Group();
  
  for (i = 0; i < this.matrix_size; i++) {
    for (j = 0; j < this.matrix_size; j++) {
      if (this.matrix[i][j] == 1) {
        block = tetris.graphics.redblock.clone();
        
        block.position.set(j, i, 0);
        
        this.group.add(block);
        this.blocks.push(block);
      }
    }
  }
  
//  for (i = 0, l = this.blocks.length; i < l; i++)
//    this.group.add(this.blocks[i]);
  
  this.parent.add(this.group);
}


Tetrimino.prototype.show = function() {
  var i, l;
  
  this.parent.add(this.group);
  this.visible = true;
  
  for (i = 0, l = this.blocks.length; i < l; i++)
    this.group.add(this.blocks[i]);
};


Tetrimino.prototype.hide = function() {
  var i, l;
  
  this.parent.remove(this.group);
  this.visible = false;
  
  for (i = 0, l = this.blocks.length; i < l; i++)
    this.group.remove(blocks[i]);
};


Tetrimino.prototype.remove = function() {
  var i, l;
  
  for (i = 0, l = this.blocks.length; i < l; i++)
    this.group.remove(this.blocks[i]);
  
  this.parent.remove(this.group);
  
  this.type = null;
  this.matrix = null;
  this.matrix_size = null;
  this.row = null;
  this.column = null;
  this.visible = null;
  this.blocks = null;
};
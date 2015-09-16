/*    File: game.js, a part of my tetris-threejs project
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

var tetris = tetris || {};
tetris.json_loader = new THREE.JSONLoader();


tetris.init = function() {
  tetris.rng = new MersenneTwister();
  tetris.renderer = new THREE.WebGLRenderer();
  tetris.camera = new THREE.PerspectiveCamera(90, 800 / 800, 0.1, 1000);
  tetris.stats = new Stats();

  tetris.renderer.setClearColor(0x505060, 1);
  tetris.renderer.setSize(800, 800);
  tetris.renderer.autoClear = false;
  
  document.getElementById("main").appendChild(tetris.renderer.domElement);
  document.body.appendChild(tetris.stats.domElement);
  
  tetris.build_world();
  tetris.build_board();
  tetris.build_pause();
  tetris.build_gameover();
  tetris.graphics.raf = tetris.render();
  
  tetris.init_dev_binds();
  tetris.init_keyboard_binds();
  tetris.init_options_binds();
  
  tetris.stats.score = 0;
  tetris.stats.highscore = 0;
  tetris.stats.total_lines_cleared = 0;
  tetris.stats.last_lines_cleared = 0;
  tetris.stats.level = 0;
  tetris.stats.speed = 0;
};


tetris.load_assets = function() {
  tetris.load_graphics();
};


tetris.join_the_party = function() {
  var block, row, column;
  var i;
  
  /* all tetriminos have 4 blocks, so i iterate the cheap way */
  for (i = 0; i < 4; i++) {
    /* assigning the block's parent to tetris.board is not a good way to allow
     * it to use the internal .goto() method.  in this case its tantamount to
     * putting on a blindfold and walking into someone elses house and walking
     * around.  in this situation it just HAPPENS that the house we're walking
     * into has the expected layout.
     * 
     * this is really nasty, and needs to be done differently
     */
    block = new Block(tetris.graphics.blueblock.clone(), tetris.board.group, tetris.board);
    
    row = 20 - tetris.board.current.matrix.num_rows - tetris.board.current.row + tetris.board.current.blocks[i].row;
    column = tetris.board.current.column + tetris.board.current.blocks[i].column;
    
    block.goto(row, column);
    block.show();
    
    tetris.board.matrix.matrix[(row * tetris.board.matrix.num_columns) + column] = 1;
    tetris.board.blocks.push(block);
  }
  
  tetris.board.current.remove();
  delete tetris.board.current;
};


tetris.check_gameover = function() {
  var i, j, k, l;
  var mm, against, offsets, temp;
  var chunk = [];
  var gameover = false;
  
  mm = new Matrix2d(tetris.board.current.matrix.num_rows, tetris.board.current.matrix.num_columns, tetris.board.current.matrix.debug);
  mm.update(tetris.board.current.matrix.matrix);
  
  offsets = mm.minimize();
  against = new Matrix2d(mm.num_rows, mm.num_columns, mm.matrix.debug);
  
  for (i = (tetris.board.current.offsets.top + offsets.top), j = (i + mm.num_rows); i < j; i++) {
    for (k = (tetris.board.current.offsets.left + offsets.left), l = (k + mm.num_columns); k < l; k++) {
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
      if ((against.matrix[(i * against.num_columns) + j] >= 2) || (against.matrix[(i * against.num_columns) + j] === undefined))
        gameover = true;
      
      if (gameover)
        break;
    }
    
    if (gameover)
      break;
  }
  
  if (gameover) {
    tetris.gameover = true;
    
    if (tetris.pulse) {
      clearInterval(tetris.pulse);
      tetris.pulse = null;
    }
    
    tetris.world.group.add(tetris.game_over.group);
  }
  
  return gameover;
};


tetris.update_score = function(lines) {
  var bonus = false;
  
  if ((lines <= 0) || (lines >= 5))
    return false;
  
  if ((lines == 4) && (tetris.stats.last_lines_cleared == 4))
    bonus = true;
  
  tetris.stats.last_lines_cleared = lines;
  tetris.stats.total_lines_cleared += lines;
  
  tetris.stats.score += points[lines - 1];
  
  if (bonus)
    tetris.stats.score += Math.floor((points[lines - 1] / 2));
  
  tetris.stats.level = Math.max(1, Math.floor(tetris.stats.total_lines_cleared / 10));
  tetris.stats.speed = Math.max(1, 10 - Math.floor(tetris.stats.level / 2));
  
  if (tetris.stats.score > tetris.stats.highscore)
    tetris.stats.highscore = tetris.stats.score;
  
  tetris.update_scoreboard();
};


tetris.halt_for_animation = function() {
  if (tetris.pulse)
    clearInterval(tetris.pulse);
  
  tetris.halted = true;
};


tetris.handle_full_rows = function() {
  var i, j, k, l, n, row, column, sum, index;
  var to_remove = [];
  
  n = 0;
  
  for (row = 0; row < tetris.board.matrix.num_rows; row++) {
    sum = 0;
    
    for (column = 0; column < tetris.board.matrix.num_columns; column++)
      sum += tetris.board.matrix.matrix[(row * tetris.board.matrix.num_columns) + column];
    
    if (sum == 10) {
      n++;
      
      to_remove.push(row);
    }
  }
  
  if ((n <= 0) || (n >= 5))
    return n;
  
  for (i = tetris.board.blocks.length - 1; i >= 0; i--) {
    if (to_remove.indexOf(tetris.board.blocks[i].row) != -1) {
      if (tetris.board.animating.indexOf(tetris.board.blocks[i]) == -1)
        tetris.board.animating.push(tetris.board.blocks[i]);
      
      tetris.board.blocks.splice(i, 1);
    }
  }
  
  for (i = 0, j = tetris.board.animating.length; i < j; i++)
    tetris.board.animating[i].animate(1);
  
  if (tetris.board.animating.length >= 1)
    tetris.halt_for_animation();
  
  for (i = 0, j = to_remove.length; i < j; i++) {
    tetris.board.matrix.matrix.splice((to_remove[i] * tetris.board.matrix.num_columns), tetris.board.matrix.num_columns);
    tetris.board.matrix.matrix.unshift(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  
  if (!tetris.halted)
    tetris.redistribute_blocks();
  
  tetris.update_score(n);
};


tetris.pause = function() {
  tetris.paused = !tetris.paused;
  
  if (tetris.paused) {
    tetris.world.group.add(tetris.pause.group);
    
    if (tetris.pulse) {
      clearInterval(tetris.pulse);
      tetris.pulse = null;
    }
    
    tetris.controls.deactivate(["up", "right", "down", "left"]);
    
    tetris.render();
  } else {
    tetris.world.group.remove(tetris.pause.group);
    
    if (!tetris.pulse)
      tetris.pulse = setInterval(tetris.heartbeat, 100);
    
    tetris.controls.activate(["up", "right", "down", "left"]);
    
    tetris.render_interrupt();
  }
};


tetris.reset_game = function() {
  var i, l;
  
  tetris.stats.score = 0;
  tetris.stats.total_lines_cleared = 0;
  tetris.stats.last_lines_cleared = 0;
  tetris.stats.level = 1;
  tetris.stats.speed = 10;
  
  tetris.world.flipping_world = false;
  tetris.world.rotation_delta = 0;
  
  tetris.board.sequence = [];
  
  if (tetris.pulse) {
    clearInterval(tetris.pulse);
    tetris.pulse = null;
  }
  
  if (tetris.board.current) {
    tetris.board.current.remove();
    delete tetris.board.current;
  }

  if (tetris.board.preview) {
    tetris.board.preview.remove();
    delete tetris.board.preview;
  }
  
  if (tetris.world_flipped) {
    tetris.board.group.rotation.y = 0;
    tetris.world_flipped = false;
  }
  
  if (tetris.paused) {
    tetris.paused = false;
    tetris.world.group.remove(tetris.pause.group);
  }
  
  if (tetris.gameover) {
    tetris.gameover = false;
    tetris.world.group.remove(tetris.game_over.group);
  }
  
  for (i = 0, l = tetris.board.blocks.length; i < l; i++)
    tetris.board.blocks[i].remove();
  
  tetris.board.blocks = [];
  
  tetris.board.matrix.update(empty_board);
};


tetris.new_game = function() {
  var random;
  
  tetris.reset_game();
    
  if (tetris.config.sequencing.sequence_type == 1) {
    tetris.resequence();
    
    tetris.board.current = new Tetrimino(tetriminos[tetris.board.sequence[tetris.board.sequence.length - 1]], tetris.board.group);
    tetris.board.preview = new Tetrimino(tetriminos[tetris.board.sequence[tetris.board.sequence.length - 2]], tetris.board.group);
    
    tetris.board.sequence.splice((tetris.board.sequence.length - 2), 2);
  } else {
    random = tetris.rng.between(0, tetriminos.length - 1);
    tetris.board.current = new Tetrimino(tetriminos[random], tetris.board.group);
    
    random = tetris.rng.between(0, tetriminos.length - 1);
    tetris.board.preview = new Tetrimino(tetriminos[random], tetris.board.group);
  }
  
  /* deletion takes place in reset_game() */
  tetris.board.current.goto(20 - tetris.board.current.matrix.num_rows, 4);
  tetris.board.current.show();
  
  tetris.board.preview.show();
  tetris.position_preview();

  /* cleared in reset_game(), but just in case... */
  if (!tetris.pulse)
    tetris.pulse = setInterval(tetris.heartbeat, 100);
  
  tetris.update_scoreboard();
};


tetris.resequence = function() {
  var i, j, k;
  
  /* reseed the rng with the current time.  this is a lame reseeding solution for the lazy. */
  tetris.rng.init_genrand((typeof Date.now === "function") ? Date.now() : Date().getTime());
  
  /* this probably won't be called without the sequence being empty, but just in case... */
  tetris.board.sequence = [];
  
  for (i = 0; i < tetris.config.sequencing.deck_size; i++)
    for (j = 0, k = tetriminos.length; j < k; j++)
      tetris.board.sequence.push(j);
  
  /* perform a durstenfeld shuffle */
  for (i = tetris.board.sequence.length - 1; i > 0; i--) {
    j = tetris.rng.between(0, i);
    
    k = tetris.board.sequence[i];
    tetris.board.sequence[i] = tetris.board.sequence[j];
    tetris.board.sequence[j] = k;
  }
};


tetris.heartbeat = (function() {
  var interval = 0;
  var seconds = 0;
  
  return function() {
    interval++;
    
    if (interval >= 1000)
      interval = 0;
    
    if (!(interval % 10))
      seconds++;
    
    if (!(interval % tetris.stats.speed)) {
      tetris.move_down(); /* force the player down 1 */
    }
    
    if (tetris.collided) {
      tetris.join_the_party();
      tetris.handle_full_rows(); /* remove any full rows and update score */
      tetris.preview_to_current();
      tetris.next_to_preview();
      
      tetris.collided = false;
    }
  };
})();


$(document).ready(function() {
  /* init_dev_binds() inuuuuuujklll init() depends on DOM element ids to reference
   * so web_ui() should come first
   */
  tetris.web_ui();
  tetris.load_assets();
});
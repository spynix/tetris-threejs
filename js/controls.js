/*    File: controls.js, a part of my tetris-threejs project
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


tetris.move_up = function() {
  if (tetris.board.current && !tetris.collided && !tetris.halted)
    tetris.board.current.move(UP);
};


tetris.move_right = function() {
  if (tetris.board.current && !tetris.collided && !tetris.halted)
    tetris.board.current.move(RIGHT);
};


tetris.move_down = function() {
  if (tetris.board.current && !tetris.collided && !tetris.halted)
    tetris.board.current.move(DOWN);
};


tetris.move_left = function() {
  if (tetris.board.current && !tetris.collided && !tetris.halted)
    tetris.board.current.move(LEFT);
};


tetris.rotate = function() {
  if (tetris.board.current && !tetris.collided && !tetris.halted)
    tetris.board.current.rotate();
};


tetris.init_dev_binds = function() {
  $("#rotate_world").on("click", function() {
    tetris.rotate_world();
  });
  
  $("#spawn_tetrimino").on("click", function() {
    tetris.spawn_tetrimino();
  });
  
  $("#spawn_preview").on("click", function() {
    tetris.next_to_preview();
  });
};


tetris.init_options_binds = function() {
  $("#deck_size").val(tetris.config.sequencing.deck_size);
  
  $("#sequencing_random").on("click", function() {
    tetris.config.sequencing.sequencing_type = ~~this.value;
    $("#deck_size").prop("disabled", true);
  });
  
  $("#sequencing_deck").on("click", function() {
    tetris.config.sequencing.sequencing_type = ~~this.value;
    $("#deck_size").prop("disabled", false);
  });
  
  $("#deck_size").on("keydown", function(event) {
    if (!this.disabled && (event.which == 13) && !isNaN(this.value))
      tetris.config.sequencing.deck_size = ~~this.value;
  });
  
  $("#sequencing_random").click();
  
  $("#global_intensity").val(tetris.config.graphics.multipliers.global_intensity);
  $("#red_intensity").val(tetris.config.graphics.multipliers.red_intensity);
  
  $("#animation_all").prop("checked", tetris.config.graphics.animations.animation_all);
  $("#animation_single").prop("checked", tetris.config.graphics.animations.animation_single);
  $("#animation_double").prop("checked", tetris.config.graphics.animations.animation_double);
  $("#animation_turkey").prop("checked", tetris.config.graphics.animations.animation_turkey);
  $("#animation_tetris").prop("checked", tetris.config.graphics.animations.animation_tetris);
  
  $("#effects_all").prop("checked", tetris.config.graphics.effects.effects_all);
  $("#effects_sparks").prop("checked", tetris.config.graphics.effects.effects_sparks);
  
  $("#global_intensity").on("keydown", function(event) {
    if (event.which == 13)
      if (!isNaN(this.value)) {
        tetris.graphics.update_multiplier(this.id, parseFloat(this.value));
        tetris.graphics.propagate_light_intensity();
      }
  });
  
  $("#red_intensity").on("keydown", function(event) {
    if (event.which == 13)
      if (!isNaN(this.value)) {
        tetris.graphics.update_multiplier(this.id, parseFloat(this.value));
        tetris.graphics.propagate_light_intensity();
      }
  });
  
  $("#bias_i").val(tetris.config.sequencing.bias[0]);
  $("#bias_j").val(tetris.config.sequencing.bias[1]);
  $("#bias_l").val(tetris.config.sequencing.bias[2]);
  $("#bias_o").val(tetris.config.sequencing.bias[3]);
  $("#bias_s").val(tetris.config.sequencing.bias[4]);
  $("#bias_t").val(tetris.config.sequencing.bias[5]);
  $("#bias_z").val(tetris.config.sequencing.bias[6]);
  
  $("#bias_i").prop("disabled", true);
  $("#bias_j").prop("disabled", true);
  $("#bias_l").prop("disabled", true);
  $("#bias_o").prop("disabled", true);
  $("#bias_s").prop("disabled", true);
  $("#bias_t").prop("disabled", true);
  $("#bias_z").prop("disabled", true);
};


tetris.init_keyboard_binds = function() {
  tetris.controls = new KeyAssist([
    {
      label: "pausebreak",
      code: 19,
      active: true,
      down: tetris.pause,
      during: null,
      up: null
    }, {
      label: "space",
      code: 32,
      active: true,
      down: tetris.spawn_tetrimino,
      during: null,
      up: null
    }, {
      label: "left",
      code: 37,
      active: true,
      down: tetris.move_left,
      during: tetris.move_left,
      up: null
    }, {
      label: "up",
      code: 38,
      active: true,
      interval: 200,
      down: tetris.rotate,
      during: tetris.rotate,
      up: null
    }, {
      label: "right",
      code: 39,
      active: true,
      down: tetris.move_right,
      during: tetris.move_right,
      up: null
    }, {
      label: "down",
      code: 40,
      active: true,
      down: tetris.move_down,
      during: tetris.move_down,
      up: null
    }, {
      label: "w",
      code: 87,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "s",
      code: 83,
      active: true,
      down: tetris.move_down,
      during: tetris.move_down,
      up: null
    }, {
      label: "a",
      code: 65,
      active: true,
      down: tetris.move_left,
      during: tetris.move_left,
      up: null
    }, {
      label: "d",
      code: 68,
      active: true,
      down: tetris.move_right,
      during: tetris.move_right,
      up: null
    }, {
      label: "n",
      code: 78,
      active: true,
      down: tetris.new_game,
      during: null,
      up: null
    }, {
      label: "r",
      code: 82,
      active: true,
      down: tetris.rotate_world,
      during: null,
      up: null
    }
  ], {
    debug: false,
    interval: 100
  });
};
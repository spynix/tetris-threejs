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


tetris.init_dev_binds = function() {
  $("#rotate_world").on("click", function() {
    tetris.rotate_world();
  });
  
  $("#spawn_tetrimino").on("click", function() {
    tetris.spawn_tetrimino();
  });
  
  $("#global_intensity").val(tetris.config.graphics.multipliers.global_intensity);
  
  $("#global_intensity").on("keydown", function(event) {
    if (event.which == 13)
      tetris.config.graphics.multipliers.global_intensity = parseInt(this.value, 10);
  });
  
  $("#red_intensity").val(tetris.config.graphics.multipliers.red_intensity);
  
  $("#red_intensity").on("keydown", function(event) {
    if (event.which == 13)
      tetris.config.graphics.multipliers.red_intensity = parseInt(this.value, 10);
  });
};


tetris.init_keyboard_binds = function() {
  tetris.controls = new KeyAssist([
    {
      label: "pausebreak",
      code: 19,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "space",
      code: 32,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "left",
      code: 37,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "up",
      code: 38,
      active: true,
      down: tetris.rotate_tetrimino,
      during: null,
      up: null
    }, {
      label: "right",
      code: 39,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "down",
      code: 40,
      active: true,
      down: null,
      during: null,
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
      down: null,
      during: null,
      up: null
    }, {
      label: "a",
      code: 65,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "d",
      code: 68,
      active: true,
      down: null,
      during: null,
      up: null
    }, {
      label: "n",
      code: 78,
      active: true,
      down: null,
      during: null,
      up: null
    }
  ], {
    debug: true
  });
};
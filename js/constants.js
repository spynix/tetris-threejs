/*    File: constants.js, a part of my tetris-threejs project
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

tetris.debug = tetris.debug || {};
tetris.config = tetris.config || {};
tetris.config.graphics = tetris.config.graphics || {};
tetris.config.sequencing = tetris.config.sequencing || {};
tetris.config.graphics.multipliers = tetris.config.graphics.multipliers || {};
tetris.config.graphics.animations = tetris.config.graphics.animations || {};
tetris.config.graphics.effects = tetris.config.graphics.effects || {};
tetris.stats = tetris.stats || {};
tetris.manifests = tetris.manifests || {};
tetris.graphics = tetris.graphics || {};
tetris.sounds = tetris.sounds || {};
tetris.world = tetris.world || {};
tetris.board = tetris.board || {};
tetris.pause = tetris.pause || {};

tetris.debug.audio = tetris.debug.audio || false;
tetris.debug.graphics = tetris.debug.graphics || false;
tetris.debug.controls = tetris.debug.controls || false;

tetris.config.sequencing.sequencing_type = 0;
tetris.config.sequencing.deck_size = 5;
tetris.config.sequencing.bias = [];

tetris.config.graphics.multipliers.global_intensity = 1;
tetris.config.graphics.multipliers.red_intensity = 2;

tetris.config.graphics.animations.animation_all = true;
tetris.config.graphics.animations.animation_single = true;
tetris.config.graphics.animations.animation_double = true;
tetris.config.graphics.animations.animation_turkey = true;
tetris.config.graphics.animations.animation_tetris = true;

tetris.config.graphics.effects.effects_all = true;
tetris.config.graphics.effects.effects_sparks = true;

tetris.stats.score = 0;
tetris.stats.highscore = 0;
tetris.stats.total_lines_cleared = 0;
tetris.stats.last_lines_cleared = 0;
tetris.stats.level = 0;
tetris.stats.speed = 0;

tetris.sounds.assets_loaded = 0;
tetris.graphics.assets_loaded = 0;

tetris.world.flipping_world = false;
tetris.world.rotation_delta = 0;

tetris.board.sequence = [];
tetris.board.animating = [];

tetris.paused = false;
tetris.halted = false;
tetris.collided = false;

tetris.paths = {
  sounds: "res/audio/",
  graphics: "res/graphics/"
};


var sounds = [
  "background",
  "woosh"
];


var graphics = [
  "blue_block_1",
  "green_block_1",
  "red_block_1"
];


var tetriminos = Object.freeze([
  {
    name: "i",
    type: 0,
    size: 4,
    matrices: [
      [
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0,
        0, 1, 0, 0
      ], [
        0, 0, 0, 0,
        1, 1, 1, 1,
        0, 0, 0, 0,
        0, 0, 0, 0
      ]
    ]
  },
  
  {
    name: "j",
    type: 1,
    size: 3,
    matrices: [
      [
        0, 1, 0,
        0, 1, 0,
        1, 1, 0
      ], [
        1, 0, 0,
        1, 1, 1,
        0, 0, 0
      ], [
        1, 1, 0,
        1, 0, 0,
        1, 0, 0
      ], [
        0, 0, 0,
        1, 1, 1,
        0, 0, 1
      ]
    ]
  },
  
  {
    name: "l",
    type: 2,
    size: 3,
    matrices: [
      [
        1, 0, 0,
        1, 0, 0,
        1, 1, 0
      ], [
        1, 1, 1,
        1, 0, 0,
        0, 0, 0
      ], [
        1, 1, 0,
        0, 1, 0,
        0, 1, 0
      ], [
        0, 0, 0,
        0, 0, 1,
        1, 1, 1
      ]
    ]
  },
  
  {
    name: "o",
    type: 3,
    size: 2,
    matrices: [
      [
        1, 1,
        1, 1
      ]
    ]
  },
  
  {
    name: "s",
    type: 4,
    size: 3,
    matrices: [
      [
        1, 0, 0,
        1, 1, 0,
        0, 1, 0
      ], [
        0, 1, 1,
        1, 1, 0,
        0, 0, 0
      ]
    ]
  },
  
  {
    name: "t",
    type: 5,
    size: 3,
    matrices: [
      [
        0, 1, 0,
        1, 1, 1,
        0, 0, 0
      ], [
        0, 1, 0,
        0, 1, 1,
        0, 1, 0
      ], [
        0, 0, 0,
        1, 1, 1,
        0, 1, 0
      ], [
        0, 1, 0,
        1, 1, 0,
        0, 1, 0
      ]
    ]
  },
  
  {
    name: "z",
    type: 6,
    size: 3,
    matrices: [
      [
        0, 1, 0,
        1, 1, 0,
        1, 0, 0
      ], [
        1, 1, 0,
        0, 1, 1,
        0, 0, 0
      ]
    ]
  }
]);


(function() {
  var i, l;
  
  for (i = 0, l = tetriminos.length; i < l; i++)
    tetris.config.sequencing.bias.push(1);
})();


var ANIM_NONE   = 0;
var ANIM_SINGLE = 1;
var ANIM_DOUBLE = 2;
var ANIM_TURKEY = 3;
var ANIM_TETRIS = 4;


var UP     = 0;
var RIGHT  = 1;
var DOWN   = 2;
var LEFT   = 3;
var ROTATE = 4;

var directions = [
  "up",
  "right",
  "down",
  "left",
  "rotate"
];

var points = [
  100,
  200,
  400,
  800
];


var empty_board = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var background = [
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
  9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
];
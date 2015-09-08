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
tetris.debug.audio = tetris.debug.audio || false;
tetris.debug.graphics = tetris.debug.graphics || false;
tetris.debug.controls = tetris.debug.controls || false;

tetris.manifests = tetris.manifests || {};
tetris.manifests.sounds = tetris.manifests.sounds || [];
tetris.manifests.graphics = tetris.manifests.graphics || [];

tetris.graphics = tetris.graphics || {};
tetris.sounds = tetris.sounds || {};

tetris.world = tetris.world || {};
tetris.world.board = tetris.world.board || {};
tetris.world.board.matrix = tetris.world.board.matrix || [];
tetris.world.board.blocks = tetris.world.board.blocks || [];


tetris.config.paths = {
  sounds: "res/audio/",
  graphics: "res/graphics/"
};


var sounds = [
  "bg-a-1",
  "bg-a-2",
  "bg-a-3",
  "bg-a-4",
  "bg-b-1",
  "bg-c-1",
  "bg-nyan-1",
  "bg-nyan-2",
  "woosh"
];


var graphics = [
  "block_red_1",
  "block_red_2",
  "block_green_1",
  "block_green_2",
  "block_blue_1",
  "block_blue_2"
];


var tetriminos = Object.freeze([
  {
    name: "i",
    type: 0,
    size: 4,
    matrix: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ]
  },
  
  {
    name: "j",
    type: 1,
    size: 3,
    matrix: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ]
  },
  
  {
    name: "l",
    type: 2,
    size: 3,
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ]
  },
  
  {
    name: "o",
    type: 3,
    size: 2,
    matrix: [
      [1, 1],
      [1, 1]
    ]
  },
  
  {
    name: "s",
    type: 4,
    size: 3,
    matrix: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  },
  
  {
    name: "t",
    type: 5,
    size: 3,
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  },
  
  {
    name: "z",
    type: 6,
    size: 3,
    matrix: [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]
  }
]);


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
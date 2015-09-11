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
  tetris.render();
  
  tetris.init_dev_binds();
};


tetris.load_assets = function() {
  tetris.load_graphics();
};


$(document).ready(function() {
  /* init_dev_binds() inuuuuuujklll init() depends on DOM element ids to reference
   * so web_ui() should come first
   */
  tetris.web_ui();
  tetris.load_assets();
});
/*    File: graphics.js, a part of my tetris-threejs project
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


tetris.load_graphics = function() {
  tetris.json_loader.load("./res/graphics/blue_block_1.js", function(geometry, materials) {
    tetris.graphics.blueblock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    
    tetris.graphics.assets_loaded++;

    if (tetris.graphics.assets_loaded == 3)
      tetris.graphics_loaded();
  });
  
  tetris.json_loader.load("./res/graphics/green_block_1.js", function(geometry, materials) {
    tetris.graphics.greenblock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    
    tetris.graphics.assets_loaded++;

    if (tetris.graphics.assets_loaded == 3)
      tetris.graphics_loaded();
  });
  
  tetris.json_loader.load("./res/graphics/red_block_1.js", function(geometry, materials) {
    tetris.graphics.redblock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    
    tetris.graphics.assets_loaded++;

    if (tetris.graphics.assets_loaded == 3)
      tetris.graphics_loaded();
  });
};


tetris.graphics_loaded = function() {
  tetris.init();
};


tetris.build_world = function() {
  var i, j;
  var temp;
  
  tetris.world.pivot = new THREE.Group();
  tetris.world.group = new THREE.Group();
  tetris.world.scene = new THREE.Scene();
  tetris.world.light = new THREE.DirectionalLight(0xffffff, 1.0);
  tetris.world.redlight = new THREE.PointLight(0xff6060, 0, 50);
//  tetris.world.trackball = new THREE.TrackballControls(tetris.camera);
  tetris.world.matrix = new Matrix2d(23, 28, true);
  tetris.world.matrix.update(background);
  tetris.world.blocks = [];
  
  for (i = 0; i < 23; i++)
    for (j = 0; j < 28; j++)
      if (tetris.world.matrix.matrix[(i * 28) + j] == 9) {
        temp = tetris.graphics.greenblock.clone();
        
        temp.position.x = j;
        temp.position.y = -i;
        
        tetris.world.blocks.push(temp);
      }
  
  for (i = 0, j = tetris.world.blocks.length; i < j; i++)
    tetris.world.group.add(tetris.world.blocks[i]);
  
  tetris.camera.position.set(0, 0, 15);
  tetris.camera.lookAt(tetris.world.group.position);
  
  tetris.world.group.position.set(-13.5, 10.5, 0);
  tetris.world.light.position.set(0, 5, 5);

  tetris.world.redlight.position.set(0, -15, -5);
//  tetris.world.redlight.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8), new THREE.MeshBasicMaterial({ color: 0xff6060 })));
  
  tetris.world.pivot.add(tetris.world.group);
  tetris.world.pivot.add(tetris.world.light);
  tetris.world.pivot.add(tetris.world.redlight);
  tetris.world.scene.add(tetris.world.pivot);
  
//  tetris.world.trackball.rotateSpeed = 3.0;
};


tetris.reset_world = function() {
  tetris.flipping_world = false;
  tetris.world_rotation_delta = 0;
  tetris.world_flipped = false;
  tetris.world.pivot.rotation.set(0, 0, 0);
  tetris.world.redlight.intensity = 0;
};


tetris.rotate_world = function() {
  tetris.flipping_world = true;
  tetris.world_rotation_delta = 0;
  
//  if (!tetris.flipped)
//    tetris.world.redlight.intensity = 1.0;
};


tetris.rotating_world = function() {
  var gi = tetris.config.graphics.multipliers.global_intensity;
  var ri = tetris.config.graphics.multipliers.red_intensity;
  
  if (tetris.flipping_world == false)
    return false;
  
  tetris.world.pivot.rotation.y += 0.03;
  tetris.world_rotation_delta += 0.03;
  
  /* 0.00955 is close enough to 0.03 / pi to warrant not performing division here */
  if (tetris.world_flipped) {
    tetris.world.redlight.intensity = Math.max(tetris.world.redlight.intensity - (0.00955 * gi * ri), 0);
    tetris.world.light.intensity = Math.min(tetris.world.light.intensity + (0.00955 * gi), gi);
  } else {
    tetris.world.redlight.intensity = Math.min(tetris.world.redlight.intensity + (0.00955 * gi * ri), (gi * ri));
    tetris.world.light.intensity = Math.max(tetris.world.light.intensity - (0.00955 * gi), 0);
  }
  
  if (tetris.world_rotation_delta >= Math.PI) {
    tetris.flipping_world = false;
    
    if (tetris.world_flipped) {
      tetris.world_flipped = false;
      tetris.world.pivot.rotation.y = 0;
      tetris.world.redlight.intensity = 0;
      tetris.world.light.intensity = gi;
    } else {
      tetris.world_flipped = true;
      tetris.world.pivot.rotation.y = Math.PI;
      tetris.world.redlight.intensity = gi * ri;
      tetris.world.light.intensity = 0;
    }
    
    tetris.world_rotation_delta = 0;
  }
};


tetris.build_board = function() {
  var i, j, block;
  
  tetris.board.group = new THREE.Group();
  tetris.board.scene = new THREE.Scene();
  tetris.board.light = new THREE.DirectionalLight(0xffffff, 1.0);
//  tetris.board.redlight = new THREE.PointLight(0xff6060, 0, 50);
  tetris.board.matrix = new Matrix2d(20, 10, false);
  tetris.board.blocks = [];

//  for (i = 0; i < 20; i++) {
//    for (j = 0; j < 10; j++) {
//      block = tetris.graphics.blueblock.clone();
//      
//      block.position.set(j, i, 0);
//      
//      tetris.board.blocks.push(block);
//    }
//  }
//  
//  for (i = 0, j = tetris.board.blocks.length; i < j; i++)
//    tetris.board.group.add(tetris.board.blocks[i]);
  
  tetris.board.group.position.set(-4.5, -8.5, 0);
  tetris.board.light.position.set(0, 5, 5);
//  tetris.board.redlight.position.set(0, -15, 5);
  
  tetris.board.group.add(tetris.board.light);
//  tetris.board.group.add(tetris.board.redlight);
  tetris.board.scene.add(tetris.board.group);
};


tetris.spawn_tetrimino = function() {
  var random = tetris.rng.between(0, 6);
  
  if (tetris.board.current)
    tetris.board.current.remove();
  
  tetris.board.current = new Tetrimino(tetriminos[random], tetris.board.group);
  tetris.board.current.set_position(4, 20 - tetris.board.current.matrix.num_rows, 0);
};


tetris.render = function() {
  requestAnimationFrame(tetris.render);
  
  if (tetris.flipping_world)
    tetris.rotating_world();
  
//  tetris.world.trackball.update();
  tetris.stats.update();
  
  tetris.renderer.clear();
  tetris.renderer.render(tetris.world.scene, tetris.camera);
  tetris.renderer.render(tetris.board.scene, tetris.camera);
};
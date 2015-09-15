/*    File: graphics.js, a part of my tetris-threejs project
 *  Author: Jin Savage ("spynix")
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


tetris.graphics.total_assets = 3;


tetris.load_graphics = function() {
  tetris.json_loader.load("./res/graphics/blue_block_phong_1.js", function(geometry, materials) {
    tetris.graphics.blueblock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    tetris.graphics.blueblock.material.materials[1].shininess = 4;
    
    tetris.graphics.assets_loaded++;

    if (tetris.graphics.assets_loaded == tetris.graphics.total_assets)
      tetris.graphics_loaded();
  });
  
  tetris.json_loader.load("./res/graphics/green_block_phong_1.js", function(geometry, materials) {
    tetris.graphics.greenblock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    
    tetris.graphics.assets_loaded++;

    if (tetris.graphics.assets_loaded == tetris.graphics.total_assets)
      tetris.graphics_loaded();
  });
  
  tetris.json_loader.load("./res/graphics/red_block_phong_1.js", function(geometry, materials) {
    tetris.graphics.redblock = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    tetris.graphics.redblock.material.materials[6].shininess = 4;
    
    tetris.graphics.assets_loaded++;

    if (tetris.graphics.assets_loaded == tetris.graphics.total_assets)
      tetris.graphics_loaded();
  });
  
//  tetris.json_loader.load("./res/graphics/text_game_paused_1.js", function(geometry, materials) {
//    tetris.pause.text = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
//    
//    tetris.graphics.assets_loaded++;
//
//    if (tetris.graphics.assets_loaded == tetris.graphics.total_assets)
//      tetris.graphics_loaded();
//  });
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
  tetris.world.light = new THREE.PointLight(0xffffff, 1.0, 400);
  tetris.world.redlight = new THREE.PointLight(0xff6060, 0, 50);
  
//  tetris.world.light = new THREE.DirectionalLight(0xffffff, 1.0);
//  tetris.world.lighthelper = new THREE.PointLightHelper(tetris.world.light, 1);
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
  tetris.world.light.position.set(0, 25, 25);

  tetris.world.redlight.position.set(0, -15, -5);
//  tetris.world.redlight.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 8), new THREE.MeshBasicMaterial({ color: 0xff6060 })));
  
  tetris.world.pivot.add(tetris.world.group);
  tetris.world.pivot.add(tetris.world.light);
//  tetris.world.pivot.add(tetris.world.lighthelper);
  tetris.world.pivot.add(tetris.world.redlight);
  tetris.world.scene.add(tetris.world.pivot);
  
//  tetris.world.trackball.rotateSpeed = 3.0;
};


tetris.reset_world = function() {
  tetris.world.flipping_world = false;
  tetris.world.rotation_delta = 0;
  tetris.world_flipped = false;
  tetris.world.pivot.rotation.set(0, 0, 0);
  tetris.world.redlight.intensity = 0;
};


tetris.rotate_world = function() {
//  var box;
  
  tetris.world.flipping_world = true;
  tetris.world.rotation_delta = 0;

  if (tetris.board.preview) {
    tetris.board.preview.hide();
    
//    tetris.board.preview.parent.remove(tetris.board.preview.group);
//    
//    box = new THREE.Box3().setFromObject(tetris.board.preview.group);
//    box.center(tetris.board.preview.group.position);
//    tetris.board.preview.group.position.multiplyScalar(-1);
//    
//    tetris.board.preview_pivot = new THREE.Group();
//    tetris.board.preview_pivot.add(tetris.board.preview.group);
//    
//    tetris.world.group.add(tetris.board.preview_pivot);
//    
//    tetris.rotating_position_preview();
//    
//    if (tetris.world_flipped)
//      tetris.board.preview_pivot.rotation.y = Math.PI;
  }
};


tetris.rotating_world = function() {
  var gi = tetris.config.graphics.multipliers.global_intensity;
  var ri = tetris.config.graphics.multipliers.red_intensity;
  
  if (tetris.world.flipping_world == false)
    return false;
  
  tetris.world.pivot.rotation.y += 0.03;
  tetris.world.rotation_delta += 0.03;
//  tetris.board.preview_pivot.rotation.y -= 0.03;
  
  /* 0.00955 is close enough to 0.03 / pi to warrant not performing division here */
  if (tetris.world_flipped) {
    tetris.world.redlight.intensity = Math.max(tetris.world.redlight.intensity - (0.00955 * gi * ri), 0);
    tetris.world.light.intensity = Math.min(tetris.world.light.intensity + (0.00955 * gi), gi);
  } else {
    tetris.world.redlight.intensity = Math.min(tetris.world.redlight.intensity + (0.00955 * gi * ri), (gi * ri));
    tetris.world.light.intensity = Math.max(tetris.world.light.intensity - (0.00955 * gi), 0);
  }
  
  if (tetris.world.rotation_delta >= Math.PI) {
    tetris.world.flipping_world = false;
    
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
    
    tetris.world.rotation_delta = 0;
    
    if (tetris.board.preview) {
      tetris.board.preview.show();
      
//      tetris.world.group.remove(tetris.board.preview_pivot);
//      
//      tetris.board.preview_pivot.remove(tetris.board.preview.group);
//      tetris.board.preview.parent.add(tetris.board.preview.group);
//      
//      delete tetris.board.preview_pivot;
//      
//      tetris.board.preview.group.rotation.y = 0;
//      
      tetris.position_preview();
    }
  }
};


tetris.build_board = function() {
  var i, j, block;
  
  tetris.board.group = new THREE.Group();
  tetris.board.scene = new THREE.Scene();
//  tetris.board.light = new THREE.DirectionalLight(0xffffff, 1.0);
  tetris.board.light = new THREE.PointLight(0xffffff, 1.0, 500);
  tetris.board.light2 = new THREE.PointLight(0xffffff, 1.0, 100);

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
  tetris.board.light.position.set(0, 50, 50);
  tetris.board.light2.position.set(0, 0, 50);
  
  tetris.board.scene.add(tetris.board.light);
//  tetris.board.scene.add(tetris.board.light2);
  tetris.board.scene.add(tetris.board.group);
};


tetris.build_pause = function() {
  var geometry, material, center;
  
  tetris.pause.group = new THREE.Group();
  
//  material = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
//  geometry = new THREE.PlaneGeometry(24, 8, 1, 1);
//  
//  tetris.pause.plane = new THREE.Mesh(geometry, material);
//
  tetris.pause.text = tetris.graphics.text3d("Game Paused", 2, true);
  
  tetris.pause.text.geometry.computeBoundingBox();
  center = -0.5 * (tetris.pause.text.geometry.boundingBox.max.x - tetris.pause.text.geometry.boundingBox.min.x );

//  tetris.pause.plane.position.set(0, 0, -2);
  tetris.pause.text.position.set(center, -1, 0);

//  tetris.pause.group.add(tetris.pause.plane);
  tetris.pause.group.add(tetris.pause.text);
  tetris.pause.group.position.set(13.5, -11, 5);
};


tetris.graphics.text3d = function(string, size, bevel) {
  var geometry, material, area;
  var h, i, j, k, l;
  var options = {};
  
  bevel = !!bevel;
  
  options.size = size;
  options.height = size / 4;
  options.font = "helvetiker";
  options.weight = "normal";
  options.style = "normal";
  options.curveSegments = 6;
  options.bevelEnabled = bevel;
  
  if (options.bevelEnabled) {
    options.bevelSize = size / 32;
    options.bevelThickness = size / 32;
    options.bevelSegments = 3;
  }
  
  options.material = 0;
  options.extrudeMaterial = 1;
  
  geometry = new THREE.TextGeometry(string, options);
  geometry.computeVertexNormals();
  
  //  material = new THREE.MeshPhongMaterial({ color: 0x8080ff, shading: THREE.SmoothShading });
  material = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({ color: 0x8080ff, shading: THREE.FlatShading }),
    new THREE.MeshPhongMaterial({ color: 0x8080ff, shading: THREE.SmoothShading })
  ]);
  
  if (!bevel) {
    h = 0.1 * (size * options.height);

    for (i = 0, j = geometry.faces.length; i < j; i++) {
      if (geometry.faces[i].materialIndex == 1) {
        for (k = 0, l = geometry.faces[i].vertexNormals.length; j < l; j++) {
          geometry.faces[i].vertexNormals[k].z = 0;
          geometry.faces[i].vertexNormals[k].normalize();
        }

        area = THREE.GeometryUtils.triangleArea(geometry.vertices[geometry.faces[i].a], geometry.vertices[geometry.faces[i].b], geometry.vertices[geometry.faces[i].c]);

        if (area > h) {
          for (k = 0, l = geometry.faces[i].vertexNormals.length; j < l; j ++)
            geometry.faces[i].vertexNormals[k].copy(geometry.faces[i].normal);
        }
      }
    }
  }
  
  return new THREE.Mesh(geometry, material);
};


/* update_multiplier():
 *   perhaps used to replace explicit updating
 */
tetris.graphics.update_multiplier = function(key, value) {
  tetris.config.graphics.multipliers[key] = value;
};


tetris.graphics.propagate_light_intensity = function() {
  tetris.world.light.intensity = tetris.config.graphics.multipliers.global_intensity;
  
  if (tetris.world_flipped)
    tetris.world.redlight.intensity = tetris.config.graphics.multipliers.global_intensity * tetris.config.graphics.multipliers.red_intensity;
  
  tetris.board.light.intensity = tetris.config.graphics.multipliers.global_intensity;
};


tetris.spawn_tetrimino = function() {
  var random = tetris.rng.between(0, 6);
  
  if (tetris.board.current)
    tetris.board.current.remove();
  
  tetris.board.current = new Tetrimino(tetriminos[random], tetris.board.group);
  tetris.board.current.show();
  tetris.board.current.goto(20 - tetris.board.current.matrix.num_rows, 4);
};


tetris.preview_to_current = function() {
  if (!tetris.board.preview)
    return false;
  
  if (tetris.board.current) {
    tetris.board.current.remove();
    delete tetris.board.current;
  }
  
  tetris.board.current = new Tetrimino(tetriminos[tetris.board.preview.type], tetris.board.group);
  tetris.board.current.show();
  tetris.board.current.goto(20 - tetris.board.current.matrix.num_rows, 4);
};


tetris.position_preview = function() {
  var x, y, z;
  
  if (!tetris.board.preview)
    return false;
  
  x = 12;
  y = 8;
  z = 0;
  
  switch (tetris.board.preview.type) {
    case 0:
      x += 1;
      y -= 1;
      break;
    case 1:
      x += 1.5;
      y -= 0.5;
      break;
    case 2:
      x += 1.5;
      y -= 0.5;
      break;
    case 3:
      x += 1.5;
      break;
    case 4:
      x += 1.5;
      y -= 0.5;
      break;
    case 5:
      x += 1;
      y -= 1;
      break;
    case 6:
      x += 1.5;
      y -= 0.5;
      break;
    default:
      break;
  }
  
  if (tetris.world_flipped)
    x -= 19;
  
  tetris.board.preview.set_position(x, y, z);
};


tetris.rotating_position_preview = function() {
  var x, y, z;
  
  if (!tetris.board.preview)
    return false;
  
  x = 21;
  y = -11;
  z = 0;
  
  switch (tetris.board.preview.type) {
    case 0:
      x += 1;
      y -= 1;
      break;
    case 1:
      x += 1.5;
      y -= 0.5;
      break;
    case 2:
      x += 1.5;
      y -= 0.5;
      break;
    case 3:
      x += 1.5;
      break;
    case 4:
      x += 1.5;
      y -= 0.5;
      break;
    case 5:
      x += 1;
      y -= 1;
      break;
    case 6:
      x += 1.5;
      y -= 0.5;
      break;
    default:
      break;
  }
  
  tetris.board.preview_pivot.position.set(x, y, z);
};


tetris.next_to_preview = function() {
  var random;
  
  if (tetris.board.preview) {
    tetris.board.preview.remove();
    delete tetris.board.preview;
  };
  
  if (tetris.config.sequencing.sequencing_type == 1) {
    if (tetris.board.sequence.length == 0)
      tetris.resequence();
    
    /* i haven't actually looked at the implementation of it, but logically...
     * taking from the ass end should be more efficient
     */
    tetris.board.preview = new Tetrimino(tetriminos[tetris.board.sequence[tetris.board.sequence.length - 1]], tetris.board.group);
    tetris.board.preview.show();
    tetris.board.sequence.splice((tetris.board.sequence.length - 1), 1);
  } else {
    random = tetris.rng.between(0, tetriminos.length - 1);
    
    tetris.board.preview = new Tetrimino(tetriminos[random], tetris.board.group);
  }
  
  tetris.position_preview();
};


tetris.redistribute_blocks = function() {
  var row, column;
  var i = 0;
  
  for (row = 0; row < tetris.board.matrix.num_rows; row++)
    for (column = 0; column < tetris.board.matrix.num_columns; column++)
      if (tetris.board.blocks[i] && (tetris.board.matrix.matrix[(row * tetris.board.matrix.num_columns) + column] == 1))
        tetris.board.blocks[i++].goto(row, column);
};


tetris.render = function() {
  var i, j, temp;
  var indices = [];
  
  tetris.graphics.raf = window.requestAnimationFrame(tetris.render);
  
  if (tetris.world.flipping_world)
    tetris.rotating_world();
  
//  tetris.world.trackball.update();
  tetris.stats.update();
  
  if (tetris.board.animating.length >= 1) {
    for (i = 0, j = tetris.board.animating.length; i < j; i++)
      if ((temp = tetris.board.animating[i].step()) == 1)
        indices.push(i);
    
    for (i = indices.length - 1; i >= 0; i--) {
      tetris.board.animating[indices[i]].remove();
      tetris.board.animating.splice(indices[i], 1);
    }
  } else {
    if (tetris.halted) {
      tetris.redistribute_blocks();
      tetris.pulse = setInterval(tetris.heartbeat, 100);
      tetris.halted = false;
    }
  }
  
  tetris.renderer.clear();
  tetris.renderer.render(tetris.world.scene, tetris.camera);
  tetris.renderer.render(tetris.board.scene, tetris.camera);
};

tetris.render_interrupt = function() {
  if (tetris.graphics.raf)
    window.cancelAnimationFrame(tetris.graphics.raf);
  
  tetris.graphics.raf = null;
};
/*    File: other.js, a part of my tetris-threejs project
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


tetris.web = tetris.web || { };

tetris.web_ui = function() {
  var html;
  
  tetris.web.options = accordion.create(document.getElementById("options"), [
    {
      title: "Gameplay",
      content: "Empty"
    }, {
      title: "Graphics",
      content: "Empty"
    }, {
      title: "Audio",
      content: "Empty"
    }, {
      title: "Controls",
      content: "Empty"
    }, {
      title: "Scores",
      content: "Empty"
    }, {
      title: "Developer Controls",
      content: "Empty"
    }
  ]);
  
  
  /* this is an very jackass way to do this.  i simply decided to be lazy since
   * the point of this was 
   */
  html  = '<div class="row">';
  html +=   '<div class="group">';
  html +=     'Intensity Multipliers:';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Global:</div><input id="global_intensity" class="scalar" type="text" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Red:</div><input id="red_intensity" class="scalar" type="text" />';
  html +=     '</div>';
  html +=   '</div>';
  html += '</div>';
  
  $(tetris.web.options.get_content(1)).html(html);
  
  html = '<button id="rotate_world">Rotate World</button>';
  html += '<button id="spawn_tetrimino">Spawn Tetrimino</button>';
  
  $(tetris.web.options.get_content(5)).html(html);
};
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
      title: "Scoring",
      content: "Empty"
    }, {
      title: "Statistics",
      content: "Empty"
    }, {
      title: "About",
      content: "Empty"
    }, {
      title: "Developer Controls",
      content: "Empty"
    }
  ]);
  
  
  /* this is an very jackass way to do this.  i decided to be lazy about it
   * because i was on a roll with tetris logic and i didn't want to lose the
   * zone.  this is something that i need to come back and do a much better job
   * on
   */
  
  /* gameplay */
  html  = '<div class="row">';
  html +=   '<div class="group">';
  html +=     'Sequencing:';
  html +=     '<div class="option">';
  html +=       '<div class="radio-name">Random: </div><input id="sequencing_random" type="radio" name="sequencing_type" value="0" /> <div class="radio-name">Deck: </div><input id="sequencing_deck" type="radio" name="sequencing_type" value="1" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Deck Size:</div><input id="deck_size" class="scalar" type="text" />';
  html +=     '</div>';
  html +=   '</div>';
  html +=   '<div class="group">';
  html +=     'Bias:';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'I\':</div><input id="bias_i" class="scalar" type="text" /><button id="bias_i_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'J\':</div><input id="bias_j" class="scalar" type="text" /><button id="bias_j_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'L\':</div><input id="bias_l" class="scalar" type="text" /><button id="bias_l_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'O\':</div><input id="bias_o" class="scalar" type="text" /><button id="bias_o_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'S\':</div><input id="bias_s" class="scalar" type="text" /><button id="bias_s_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'T\':</div><input id="bias_t" class="scalar" type="text" /><button id="bias_t_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name-short">\'Z\':</div><input id="bias_z" class="scalar" type="text" /><button id="bias_z_add" class="plus">+</button>';
  html +=     '</div>';
  html +=     '<div class="h-center">';
  html +=       '<button id="bias_reset" class="reset">Reset</button>';
  html +=     '</div>';
  html +=   '</div>';
  html += '</div>';
  
  $(tetris.web.options.get_content(0)).html(html);
  
  /* graphics */
  html  = '<div class="row">';
  html +=   '<div class="group">';
  html +=     'Light Intensity Multipliers:';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Global:</div><input id="global_intensity" class="scalar" type="text" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Red:</div><input id="red_intensity" class="scalar" type="text" />';
  html +=     '</div>';
  html +=   '</div>';
  html +=   '<div class="group">';
  html +=     'Line Clearing Animations:';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">All:</div><input id="animation_all" type="checkbox" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Single:</div><input id="animation_single" type="checkbox" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Double:</div><input id="animation_double" type="checkbox" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Turkey:</div><input id="animation_turkey" type="checkbox" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Tetris:</div><input id="animation_tetris" type="checkbox" />';
  html +=     '</div>';
  html +=   '</div>';
  html +=   '<div class="group">';
  html +=     'Special Effects:';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">All:</div><input id="effects_all" type="checkbox" />';
  html +=     '</div>';
  html +=     '<div class="option">';
  html +=       '<div class="option-name">Sparks:</div><input id="effects_sparks" type="checkbox" />';
  html +=     '</div>';
  html +=   '</div>';
  html += '</div>';
  
  $(tetris.web.options.get_content(1)).html(html);
  
  /* audio */
  html = "Audio stuff here...";
  
  $(tetris.web.options.get_content(2)).html(html);
  
  /* controls */
  html  = '<div class="row">';
  html +=   '<div class="key-container">';
  html +=     '<div class="key">&uparrow;</div>';
  html +=   '</div>';
  html +=   '<div class="delimiter">:</div>';
  html +=   '<div class="usage">Rotate the Tetrimino 90&deg; clockwise</div>';
  html += '</div>';
  
  html += '<div class="row">';
  html +=   '<div class="key-container">';
  html +=     '<div class="key">&leftarrow;</div>';
  html +=     '<div class="key">&downarrow;</div>';
  html +=     '<div class="key">&rightarrow;</div>';
  html +=   '</div>';
  html +=   '<div class="delimiter">:</div>';
  html +=   '<div class="usage">Move the Tetrimino in the corresponding direction</div>';
  html += '</div>';
  
  html += '<div class="row">';
  html +=   '<div class="spacer"></div>';
  html += '</div>';
  
  html += '<div class="row">';
  html +=   '<div class="key-container">';
  html +=     '<div class="key">W</div>';
  html +=   '</div>';
  html +=   '<div class="delimiter">:</div>';
  html +=   '<div class="usage">Rotate the Tetrimino 90&deg; clockwise</div>';
  html += '</div>';
  
  html += '<div class="row">';
  html +=   '<div class="key-container">';
  html +=     '<div class="key">A</div>';
  html +=     '<div class="key">S</div>';
  html +=     '<div class="key">D</div>';
  html +=   '</div>';
  html +=   '<div class="delimiter">:</div>';
  html +=   '<div class="usage">Move the Tetrimino in the corresponding direction</div>';
  html += '</div>';
  
  html += '<div class="row">';
  html +=   '<div class="spacer"></div>';
  html += '</div>';
  
  html += '<div class="row">';
  html +=   '<div class="key-container">';
  html +=     '<div class="key">N</div>';
  html +=   '</div>';
  html +=   '<div class="delimiter">:</div>';
  html +=   '<div class="usage">Start a new game</div>';
  html += '</div>';

  html += '<div class="row">';
  html +=   '<div class="spacer"></div>';
  html += '</div>';

  html += '<div class="row">';
  html +=   '<div class="key-container">';
  html +=     '<div class="key">Pause Break</div>';
  html +=   '</div>';
  html +=   '<div class="delimiter">:</div>';
  html +=   '<div class="usage">Pause the game</div>';
  html += '</div>';
  
  $(tetris.web.options.get_content(3)).html(html);
  
  /* scoring */
  html = '<div class="options-text">';
  html +=   '<div class="left">1-Line  (single):</div> 100 points<br />';
  html +=   '<div class="left">2-Lines (double):</div> 200 points<br />';
  html +=   '<div class="left">3-Lines (turkey):</div> 400 points<br />';
  html +=   '<div class="left">4-Lines (tetris):</div> 800 points<br />';
  html +=   '<div class="left">Consecutive Tetris:</div> 1200 points<br />';
  html += '</div>';
  
  $(tetris.web.options.get_content(4)).html(html);
  
  /* stats */
  html = "Stats";
  
  $(tetris.web.options.get_content(5)).html(html);
  
  /* about */
  html = "All about it...";
  
  $(tetris.web.options.get_content(6)).html(html);
  
  html  = '<button id="rotate_world">Rotate World</button>';
  html += '<button id="spawn_tetrimino">Spawn Tetrimino</button>';
  html += '<button id="spawn_preview">Spawn Preview</button>';
  
  $(tetris.web.options.get_content(7)).html(html);
};
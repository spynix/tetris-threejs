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
    }
    
//    , {
//      title: "Developer Controls",
//      content: "Empty"
//    }
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
  html +=       '<div class="option">';
  html +=         'Uniform shrinkage: <input id="animation_single_constant" type="checkbox" />';
  html +=       '</div>';
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
  html  = '<div class="options-text">';
  html += "Gameplay:<br /><br />";
  html += "Sequencing refers to the way the \"sequence\" of tetriminos are generated. ";
  html += "Random will use the random number generator and just pull whatever. ";
  html += "In theory this is supposed to produce a random series with a reasonably equal distribution. ";
  html += "Sadly this doesn't always happen, so I provide the deck variation. ";
  html += "The deck method will remind you of playing cards at a casino -- that is, you know exactly what and how many cards are in each deck. ";
  html += "Deck play here is the same. ";
  html += "A series of decks are added together and then shuffled to produce a random sequence of tetriminos with a completely equal distribution. ";
  html += "<br /><br />";
  html += "Biasing is a way to \"stack the decks\" so to speak in whatever way you like. ";
  html += "Instead of every tetrimino being added once for every deck, you can make it be added 'n' times. ";
  html += "<br /><br /><br />";
  html += "Graphics:<br /><br />";
  html += "Light intensity is just what it sounds like. ";
  html += "Currently red is used in a feature under development. ";
  html += "<br /><br />";
  html += "The line clearing animations and special effects are currently being worked on. ";
  html += "<br /><br />";
  html += "The 1-line is probably here to stay, and even has an added option of uniform or random shrink rate. ";
  html += "I don't think the 2-line is too bad... but the 3-line animation just isn't what I was looking for. ";
  html += "I had this cool amazonian aztec jenga jungle maze puzzle feel I wanted to achieve and it sounded great in my head. ";
  html += "The result failed, so I'm definitely looking for a 3-line animation. Also looking for a good tetris animation. ";
  html += "The animation ideas shouldn't require a massive investment of time to create though. ";
  html += "Think cheap bling; after all, it's not like I'm getting paid to make the animations super amazing. ";
  html += "<br /><br /><br />";
  html += "Audio:<br /><br />";
  html += "No audio yet.";
  html += "<br /><br /><br />";
  html += "Controls:<br /><br />";
  html += "Hopefully self-explanatory after reading the controls panel. ";
  html += "I'm reasonably proud of the KeyAssist system I built for helping with game controls though. ";
  html += "The controls should feel smooth and clean -- like a high quality Rubik's Cube that's brand new, nice and loose and well greased. ";
  html += "If you have any issues with the controls let me know because KeyAssist is a separate project I'm working on in parallel with this. ";
  html += "That said, I am however aware of the issue when pressing both left and right simultaneously. ";
  html += "<br /><br /><br />";
  html += "Statistics:<br /><br />";
  html += "This will use my grid plugin and display the player's scores/stats. ";
  html += "It won't be permanent storage or anything since any idiot with a JavaScript console could wreck it. ";
  html += "<br /><br /><br />";
  html += "Other:<br /><br />";
  html += "Yes I know the scoreboard is crap.  I was finishing up the larger brushstrokes of the gameplay and had to pass out but still needed score indicators. ";
  html += "It's absolutely going to be changed, or at the very least improved upon. ";
  html += "<br /><br />";
  html += "Also note that for the input boxes, you have to change the value and hit enter to propagate the new setting. ";
  html += "I might add an update button or something to make it more intuitive, or perhaps update it immeadiately on change... I haven't decided yet.";
  html += '</div>';
  
  
  $(tetris.web.options.get_content(6)).html(html);
  
//  html  = '<button id="rotate_world">Rotate World</button>';
//  html += '<button id="spawn_tetrimino">Spawn Tetrimino</button>';
//  html += '<button id="spawn_preview">Spawn Preview</button>';
//  
//  $(tetris.web.options.get_content(7)).html(html);
};
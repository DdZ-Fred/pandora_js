'use strict';

module.exports = (pandora) => {

  pandora
    .cluster('./index.js');

  /**
  * you can custom workers scale number
  */
  pandora
    .process('worker')
    .scale('auto'); // .scale('auto') means os.cpus().length

  /**
   * you can also use fork mode to start application
   */
  // pandora
  //   .fork('pandora_js', './index.js');

  /**
   * you can create another process here
   */
  // pandora
  //   .process('background')
  //   .nodeArgs(['--expose-gc']);

  /**
   * more features please visit our document.
   * https://github.com/midwayjs/pandora/
   */

};
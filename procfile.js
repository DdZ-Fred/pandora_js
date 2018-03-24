'use strict';

const AppoloServer = require('./services/apolloServer');

module.exports = (pandora) => {

  // pandora
  //   .process('ULTIMATE')
  //   .scale('auto')
  //   .env({
  //     BAPO: 'blabla'
  //   })
  //   .entry('./index.js'); // .scale('auto') means os.cpus().length

  pandora
    .process('ULTIMATE')
    .scale('auto');

  pandora
    .service('apolloServer', AppoloServer)
    .config({
      port: 3000
    })
    .process('ULTIMATE');


  /**
   * more features please visit our document.
   * https://github.com/midwayjs/pandora/
   */

};
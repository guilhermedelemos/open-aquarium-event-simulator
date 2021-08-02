const { Device } = require('./blocks/Device');
const { Header } = require('./blocks/Header');

class Periodic {

  constructor() {
    this.header = new Header('periodic');
    this.device = new Device();
  }
  
}

module.exports = { Periodic };

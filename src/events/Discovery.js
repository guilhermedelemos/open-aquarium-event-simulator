const { Device } = require('./blocks/Device');
const { Header } = require('./blocks/Header');

class Discovery {

  constructor() {
    this.header = new Header('discovery');
    this.device = new Device();
  }
  
}

module.exports = { Discovery };

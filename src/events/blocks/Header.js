const { v4: uuidv4 } = require('uuid');

class Header {
  
  constructor(type) {
    this.type = type;
    this.eventId = uuidv4();
    this.triggerTime = new Date();
  }

  generateEventId() {
    this.eventId = uuidv4();
  }

  setTriggerTimeAsNow() {
    this.triggerTime = new Date();
  }

}

module.exports = { Header };

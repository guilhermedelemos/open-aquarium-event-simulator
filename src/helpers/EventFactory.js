const { Device } = require('../events/blocks/Device');
const { Discovery } = require('../events/Discovery');
const { Periodic } = require('../events/Periodic');
const { getRandomInt } = require('./randomInt');

class EventFactory {
  
  constructor() {
    this.device = new Device();
    this.device.serialNumber = getRandomInt(1, 100);
    this.device.softwareVersion = '1.0.0';
    this.device.hardwareVersion = '9.8.7';
    this.device.secondaryMemory.cardType = 'SD';
    this.device.secondaryMemory.clusters = 478976;
    this.device.secondaryMemory.blocksPerCluster = 8;
    this.device.secondaryMemory.totalBlocks = 3831808;
    this.device.secondaryMemory.volumeType = 'FAT32';
    this.device.secondaryMemory.volumeSize = 1915904;
    
    this.lastDiscovery = new Discovery();
    this.lastDiscovery.device = this.device;
    
    this.lastPeriodic = new Periodic();
    this.lastPeriodic.device = this.device;
  }

  newDiscoveryEvent() {
    this.lastDiscovery.header.generateEventId();
    this.lastDiscovery.header.setTriggerTimeAsNow();
    return this.lastDiscovery;
  }

  newPeriodicEvent() {
    this.lastPeriodic.header.generateEventId();
    this.lastPeriodic.header.setTriggerTimeAsNow();
    return this.lastPeriodic;
  }

};

module.exports = { EventFactory };

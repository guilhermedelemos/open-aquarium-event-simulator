class Device {

  constructor() {
    this.serialNumber = undefined;
    this.softwareVersion = undefined;
    this.hardwareVersion = undefined;
    this.secondaryMemory = {
      cardType: undefined,
      clusters: undefined,
      blocksPerCluster: undefined,
      totalBlocks: undefined,
      volumeType: undefined,
      volumeSize: undefined
    };
  }
  
}

module.exports = { Device };

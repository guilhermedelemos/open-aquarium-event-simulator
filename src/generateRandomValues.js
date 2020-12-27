const randomInt = require('./randomInt');
const randomFloat = require('./randomFloat');
const randomBoolean = require('./randomBoolean');

function generateRandomValues(event, realistic=false) {
    const cloneObj = JSON.parse(JSON.stringify(event));
    
    // cloneObj.header.event = 'A';
    cloneObj.header.eventId = `A${randomInt(10, 99)}B${randomInt(10000, 99999)}`;
    cloneObj.header.triggerTime = new Date().toISOString();

    cloneObj.device.serialNumber = randomInt(1000000, 9999999);
    cloneObj.device.softwareVersion = `${randomInt(1, 9)}.${randomInt(1, 9)}.${randomInt(1, 9)}`;
    cloneObj.device.hardwareVersion = `${randomInt(1, 9)}.${randomInt(1, 9)}.${randomInt(1, 9)}`;
    cloneObj.device.productVersion = `${randomInt(1, 9)}.${randomInt(1, 9)}.${randomInt(1, 9)}`;

    if(cloneObj.rollCallData !== undefined) {
        cloneObj.rollCallData.sensors = [1, 2, 3];
    }

    if(cloneObj.roomSample !== undefined) {
        cloneObj.roomSample.roomTemperature = realistic ? randomInt(22, 40) : randomInt(-10, 50);
        cloneObj.roomSample.relativeHumidity = randomInt(0, 100);
        // cloneObj.roomSample.uvLight = randomInt(0, 100);
        // cloneObj.roomSample.visibleLight = randomInt(0, 100);
        // cloneObj.roomSample.carbonDioxideGas = randomInt(0, 100);
        cloneObj.roomSample.atmosphericPressure = randomInt(0, 100);
        // others
    }
    if(cloneObj.waterSample !== undefined) {
        cloneObj.waterSample.temperature = realistic ? randomInt(22, 30) : randomInt(-270, 100);
        // cloneObj.waterSample.alkalineReserve = randomInt(-270, 100);
        // cloneObj.waterSample.calcium = randomInt(-270, 100);
        // cloneObj.waterSample.magnesium = randomInt(-270, 100);
        // cloneObj.waterSample.phosphate = randomInt(-270, 100);
        cloneObj.waterSample.nitrate = randomInt(-270, 100);
        cloneObj.waterSample.nitrite = realistic ? randomFloat(0, 5) : randomInt(-270, 100);
        // cloneObj.waterSample.salinity = randomInt(-270, 100);
        cloneObj.waterSample.ammonia = realistic ? randomFloat(0, 5) : randomInt(-270, 100);
        cloneObj.waterSample.potentialOfHydrogen = realistic ? randomInt(6, 8) : randomInt(-270, 100);
        // cloneObj.waterSample.silica = randomInt(-270, 100);
        // cloneObj.waterSample.strontium = randomInt(-270, 100);
        // cloneObj.waterSample.boron = randomInt(-270, 100);
        cloneObj.waterSample.totalDissolvedSolids = realistic ? randomInt(50, 80) : randomInt(-270, 100);
        cloneObj.waterSample.chlorine = randomBoolean();
        // cloneObj.waterSample.freeChlorine = randomInt(-270, 100);
        // cloneObj.waterSample.carbonDioxide = randomInt(-270, 100);
        // cloneObj.waterSample.carbonatedHardness = randomInt(-270, 100);
        // cloneObj.waterSample.generalHardness = randomInt(-270, 100);
        // cloneObj.waterSample.pumpFlow = randomInt(-270, 100);
        // cloneObj.waterSample.waterLevel = randomInt(-270, 100);
    }

    return Object.freeze(cloneObj);
}
module.exports = generateRandomValues;

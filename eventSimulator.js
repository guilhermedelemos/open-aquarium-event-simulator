const discoveryEvent = require('../events/DISCOVERY.json');
const periodicEvent = require('../events/PERIODIC.json');

periodicEvent.header.timestamp = new Date().toISOString();

console.log('DISCOVERY', generateRandomValues(discoveryEvent));
console.log('PERIODIC', generateRandomValues(periodicEvent));

function generateRandomValues(event) {
    const clone = JSON.parse(JSON.stringify(event));
    
    clone.header.eventId = `A${randomInt(10, 99)}B${randomInt(10000, 99999)}`;
    clone.header.timestamp = new Date().toISOString();

    clone.device.serialNumber = randomInt(1000000, 9999999);
    clone.device.softwareVersion = `${randomInt(1, 9)}.${randomInt(1, 9)}.${randomInt(1, 9)}`;
    clone.device.hardwareVersion = `${randomInt(1, 9)}.${randomInt(1, 9)}.${randomInt(1, 9)}`;
    clone.device.productVersion = `${randomInt(1, 9)}.${randomInt(1, 9)}.${randomInt(1, 9)}`;

    if(clone.roomSample !== undefined) {
        clone.roomSample.roomTemperature = randomInt(-270, 100);
        clone.roomSample.relativeHumidity = randomInt(0, 100);
    }
    if(clone.waterSample !== undefined) {
        clone.waterSample.temperature = randomInt(-270, 100);
    }

    return Object.freeze(clone);
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}
function randomFloat(min, max) {
    return min + (max - min) * Math.random();
}

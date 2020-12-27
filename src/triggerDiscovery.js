const generateRandomValues = require('../src/generateRandomValues');
const discoveryEvent = require('../events/DISCOVERY.json');

const triggerDiscovery = async (printEvent = false, realistic = false) => {
    const event = generateRandomValues(discoveryEvent, true);
    console.log('DISCOVERY', event.header.triggerTime);
    if(printEvent) {
        console.log(event);
    }
}
module.exports = triggerDiscovery;

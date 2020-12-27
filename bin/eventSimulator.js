const triggerDiscovery = require('../src/triggerDiscovery');
const triggerPeriodic = require('../src/triggerPeriodic');

const config = require('../config/shadow.json');
const interval = config.event.periodicInterval;
const printEvent = config.log.level === 'debug';
const realistic = true;

let triggerTime = new Date(0);

function triggerEvents() {
    let difference = new Date() - triggerTime;
    if(difference > config.event.discoveryTTL) {
        triggerTime = new Date();
        triggerDiscovery(printEvent, realistic);
    }
    triggerPeriodic(printEvent, realistic);
}

console.log('EVENT SIMULATOR');
setInterval(triggerEvents, interval);

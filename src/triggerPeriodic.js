const generateRandomValues = require('../src/generateRandomValues');
const periodicEvent = require('../events/PERIODIC.json');

const triggerPeriodic = async (printEvent = false, realistic = false) => {
    const event = generateRandomValues(periodicEvent, realistic);
    console.log('PERIODIC', event.header.triggerTime);
    if(printEvent) {
        console.log(event);
    }
}
module.exports = triggerPeriodic;

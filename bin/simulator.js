const { AwsIotClient } = require('../src/AwsIotClient');
const { EventFactory } = require('../src/helpers/EventFactory');
const { logger } = require('../src/logger');
const { sleep } = require('../src/helpers/sleep');

const discoveryTopic = 'rd/discovery';
const periodicTopic = 'rd/periodic';
const privateCertificate = './certs/private.pem.key';
const deviceCertificate = './certs/certificate.pem.crt';
const certificateAuthoritie = './certs/AmazonRootCA1.pem';
const deviceDataEndpoint = process.env.OA_ENDPOINT || 'XYZ.iot.REGION.amazonaws.com'; // CHANGE IT
const deviceName = process.env.OA_DEVICE_NAME || 'oa-event-simulator'; // CHANGE IT
const region = process.env.OA_REGION || 'REGION'; // CHANGE IT

const discoveryInterval = 20000;
const periodicInterval = 5000;

let lastDiscovery = new Date(2021, 01, 01);
let lastPeriodic = lastDiscovery;

const eventFactory = new EventFactory();

let awsIotClient = undefined;

async function setup() {
  logger.info('Open Aquarium Simulator');

  logger.info('Connecting to AWS IoT.');
  awsIotClient = new AwsIotClient(
    privateCertificate, 
    deviceCertificate, 
    certificateAuthoritie, 
    deviceDataEndpoint, 
    deviceName, 
    region, 
    discoveryTopic, 
    periodicTopic
  );
  await sleep(5000);
}

function loop() {
  const now = new Date();
  if(now - lastDiscovery >= discoveryInterval) {
    lastDiscovery = now;
    const discoveryEvent = eventFactory.newDiscoveryEvent();
    awsIotClient.publishDiscovery(discoveryEvent);
  }

  if(now - lastPeriodic >= periodicInterval) {
    lastPeriodic = now;
    const periodicEvent = eventFactory.newPeriodicEvent();
    awsIotClient.publishPeriodic(periodicEvent);
  }
}

async function run() {
  await setup();
  const start = new Date();
  while(true) {
    // stop after 1 min
    if(new Date() - start > 60000) {
      awsIotClient.end();
      break;
    }
    loop();
  }
}

run();
